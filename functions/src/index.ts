import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";
import { sendEmailWithHostinger, createHostingerTransporter } from "./smtp-config";

admin.initializeApp();

// � Cloud Function que se dispara cuando se crea un nuevo cliente
export const sendEmailOnNewClient = functions.database.ref('/clients/{clientId}')
  .onCreate(async (snapshot, context) => {
    const clientData = snapshot.val();
    const clientId = context.params.clientId;

    const htmlContent = `
      <h2>Nuevo Cliente Registrado</h2>
      <p><strong>ID:</strong> ${clientId}</p>
      <p><strong>Nombre:</strong> ${clientData.name}</p>
      <p><strong>Email:</strong> ${clientData.email}</p>
      <p><strong>Teléfono:</strong> ${clientData.phone}</p>
      <p><strong>Mensaje:</strong> ${clientData.message}</p>
      <br>
      <small>Este correo fue enviado automáticamente por Solution For Life</small>
    `;

    try {
      await sendEmailWithHostinger(
        "solutionforlife2@gmail.com",
        "Nuevo cliente registrado",
        htmlContent
      );
      logger.info("✅ Correo enviado exitosamente");
    } catch (error) {
      logger.error("❌ Error al enviar correo:", error);
      throw new functions.https.HttpsError('internal', 'Error al enviar email');
    }
  });

// 🧪 Función HTTP para probar la conexión SMTP
export const testSMTPConnection = functions.https.onRequest(async (req, res) => {
  try {
    const transporter = createHostingerTransporter();
    await transporter.verify();

    res.status(200).json({
      success: true,
      message: "✅ Conexión SMTP exitosa con Hostinger"
    });
  } catch (error) {
    logger.error("❌ Error en conexión SMTP:", error);
    res.status(500).json({
      success: false,
      message: "❌ Error en conexión SMTP",
      error: error
    });
  }
});

// 📧 Función HTTP para enviar email de prueba
export const sendTestEmail = functions.https.onRequest(async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    res.status(400).json({
      success: false,
      message: "Faltan parámetros: to, subject, message"
    });
    return;
  }

  try {
    const htmlContent = `
      <h2>Email de Prueba - SMTP Hostinger</h2>
      <p><strong>Mensaje:</strong> ${message}</p>
      <br>
      <small>Este es un email de prueba desde Firebase Functions usando SMTP de Hostinger</small>
    `;

    await sendEmailWithHostinger(to, subject, htmlContent);

    res.status(200).json({
      success: true,
      message: "✅ Email de prueba enviado exitosamente"
    });
  } catch (error) {
    logger.error("❌ Error al enviar email de prueba:", error);
    res.status(500).json({
      success: false,
      message: "❌ Error al enviar email",
      error: error
    });
  }
});

