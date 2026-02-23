
import { db } from '../firebaseConfig';
import { 
  collection, 
  serverTimestamp, 
  runTransaction, 
  doc, 
  Timestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';

interface BookingData {
  clientName: string;
  clientEmail: string;
  callDate: Date | null;
  callTime: string | null;
}

/**
 * Genera l'ID del documento nel formato richiesto: YYYYMMDD_HHmm
 */
const generateSlotId = (date: Date, time: string): string => {
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  const timePart = time.replace(/:/g, '');
  return `${datePart}_${timePart}`;
};

/**
 * Converte le stringhe di data e ora in un oggetto Date di sistema
 */
const createFullDate = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const fullDate = new Date(date);
  fullDate.setHours(hours, minutes, 0, 0);
  return fullDate;
};

/**
 * Recupera gli slot già prenotati per una data specifica.
 * Necessario per il componente Booking per mostrare la disponibilità in tempo reale.
 */
export const getBookedSlots = async (date: Date): Promise<string[]> => {
  if (!date) return [];
  const dateStr = date.toISOString().split('T')[0];
  const q = query(collection(db, 'video_calls'), where('callDate', '==', dateStr));
  const querySnapshot = await getDocs(q);
  const slots: string[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.callTime) {
      slots.push(data.callTime);
    }
  });
  return slots;
};

/**
 * Salva una prenotazione professionale usando runTransaction.
 * Impedisce il double booking tramite ID univoci temporali.
 */
export const bookVideoCall = async (data: BookingData) => {
  if (!data.clientName || !data.clientEmail || !data.callDate || !data.callTime) {
    throw new Error("Dati mancanti per la prenotazione.");
  }

  // Generiamo l'ID univoco basato sulla data e l'ora dello slot
  const slotId = generateSlotId(data.callDate, data.callTime);
  const docRef = doc(db, 'video_calls', slotId);
  const appointmentDate = createFullDate(data.callDate, data.callTime);

  try {
    return await runTransaction(db, async (transaction) => {
      const slotSnapshot = await transaction.get(docRef);

      // Controllo esistenza slot per prevenire double booking
      if (slotSnapshot.exists()) {
        throw new Error("ALREADY_BOOKED");
      }

      const payload = {
        name: data.clientName.trim(),
        email: data.clientEmail.trim(),
        callDate: data.callDate!.toISOString().split('T')[0], // Mantenere stringa leggibile es. "2026-01-20"
        callTime: data.callTime,                             // Mantenere stringa leggibile es. "10:00"
        
        // 1. NUOVO: Timestamp ISO-8601 UTC preciso per la sincronizzazione
        fullTimestamp: appointmentDate.toISOString(),
        
        // 2. NUOVO: Stato iniziale per il feedback loop del backend
        syncStatus: "pending", 
        
        // 3. Metadati standard
        type: "consultation",
        createdAt: serverTimestamp()
      };

      transaction.set(docRef, payload);
      return slotId;
    });
  } catch (e: any) {
    console.error("Errore critico transazione booking: ", e);
    throw e;
  }
};

/**
 * Salva un contatto veloce (Lead Capture).
 */
export const submitUserContact = async (name: string, email: string) => {
  try {
    // Nota: questo usa addDoc con ID casuale perché è un lead generico, non uno slot orario specifico
    const tempRef = doc(collection(db, 'video_calls'));
    await runTransaction(db, async (transaction) => {
      transaction.set(tempRef, {
        name: name.trim(),
        email: email.trim(),
        type: 'lead_capture',
        status: 'pending',
        createdAt: serverTimestamp()
      });
    });
    return tempRef.id;
  } catch (e) {
    console.error("Errore salvataggio contatto:", e);
    throw e;
  }
};
