import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import * as nodemailer from "nodemailer";

// Configurazione Globale: Imposta la regione su europe-west3 (eur3)
setGlobalOptions({ region: "europe-west3" });

// Configurazione Transporter Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "kreafase1@gmail.com",
    pass: "nfgyncpmdretoomg",
  },
});

/**
 * Trigger: Creazione documento in video_calls/{docId}
 */
export const sendBookingConfirmation = onDocumentCreated("video_calls/{docId}", async (event) => {
  // 1. DIAGNOSTICA TRIGGER
  logger.info(`[START] Funzione attivata per ID documento: ${event.params.docId}`);

  const snapshot = event.data;

  if (!snapshot) {
    logger.error("[ERROR] Nessun dato trovato nello snapshot.");
    return;
  }

  const data = snapshot.data();
  
  // 2. DIAGNOSTICA DATI
  logger.info(`[DATA READ] Dati letti dal DB:`, { 
    email: data.email, 
    name: data.name, 
    callDate: data.callDate 
  });

  const email = data.email;
  const name = data.name || "Cliente";
  const callDate = data.callDate || "Da concordare";
  const callTime = data.callTime || "--:--";
  const isBooking = !!data.callDate;

  if (!email) {
    logger.warn(`[WARN] Documento ${event.params.docId} senza indirizzo email. Stop.`);
    return;
  }

  // 3. DIAGNOSTICA SMTP (Verifica credenziali prima dell'invio)
  try {
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          logger.error("[SMTP ERROR] Connessione al server Gmail fallita. Controlla User/Pass o Piano Firebase (Serve Blaze).", error);
          reject(error);
        } else {
          logger.info("[SMTP SUCCESS] Server pronto per inviare messaggi.");
          resolve(success);
        }
      });
    });
  } catch (error) {
    return; // Esci se la connessione fallisce
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #020617; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; background-color: #050b1f; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; }
        .header { background-color: #000000; padding: 30px 20px; text-align: center; border-bottom: 2px solid #3b82f6; }
        .logo { font-size: 24px; font-weight: 900; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; }
        .logo span { color: #3b82f6; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 20px; color: #ffffff; margin-bottom: 20px; font-weight: 300; }
        .card { background-color: #0f172a; border: 1px solid #3b82f6; border-radius: 6px; padding: 25px; margin: 30px 0; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1); }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 5px; }
        .value { font-size: 18px; color: #fbbf24; font-weight: 600; margin-bottom: 15px; }
        .value-last { margin-bottom: 0; }
        .footer { background-color: #000000; padding: 20px; text-align: center; font-size: 12px; color: #475569; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KREA<span>.</span></div>
        </div>
        <div class="content">
          <p class="greeting">Salve ${name},</p>
          <p style="color: #cbd5e1; line-height: 1.6;">
            ${isBooking 
              ? "Il sistema KREA ha elaborato la sua richiesta. Il suo slot strategico è stato riservato con successo." 
              : "Abbiamo ricevuto il suo contatto. Un nostro architetto digitale la contatterà a breve."}
          </p>
          ${isBooking ? `
          <div class="card">
            <div class="label">DATA SESSIONE</div>
            <div class="value">${callDate}</div>
            <div class="label">ORARIO (UPLINK)</div>
            <div class="value value-last">${callTime}</div>
          </div>
          ` : ''}
          <p style="color: #cbd5e1; font-size: 14px; margin-top: 30px;">
            In attesa della connessione.
          </p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} KREA DIGITAL ARCHITECTURE.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: '"KREA Digital System" <kreafase1@gmail.com>',
    to: email,
    subject: `Conferma Appuntamento ${isBooking ? '- ' + callDate : ''} | KREA`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`[EMAIL SENT] Email inviata con successo a ${email}. ID: ${info.messageId}`);
    
    // Aggiorna lo stato nel DB
    await snapshot.ref.update({ 
      emailSent: true, 
      emailSentAt: new Date(),
      emailMessageId: info.messageId
    });
    
  } catch (error) {
    logger.error("[SEND ERROR] Errore finale nell'invio:", error);
  }
});