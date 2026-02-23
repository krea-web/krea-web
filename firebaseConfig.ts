// Standard Firebase v9+ initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configurazione estratta dal documento ufficiale Krea
const firebaseConfig = {
  apiKey: "AIzaSyDxDNVpdF9ya0cjatVYpYCCCpsxqtcNgb0",
  authDomain: "krea-a5388.firebaseapp.com",
  projectId: "krea-a5388",
  storageBucket: "krea-a5388.firebasestorage.app",
  messagingSenderId: "1022348848802",
  appId: "1:1022348848802:web:bf301ca381a586a581b1fb"
};

// Inizializza l'app Firebase
const app = initializeApp(firebaseConfig);

// Inizializza ed esporta l'istanza di Firestore
export const db = getFirestore(app);