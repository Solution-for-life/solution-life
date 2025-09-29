import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sgMail from "@sendgrid/mail";
import { logger } from "firebase-functions/v1";

admin.initializeApp();

// 🔑 Cargar la API Key de SendGrid
const SENDGRID_API_KEY =
  process.env.SENDGRID_API_KEY || functions.config().sendgrid?.key || "";

if (!SENDGRID_API_KEY) {
  console.error("❌ No se encontró la API Key de SendGrid");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// 🚀 Cloud Function (1st Gen) que se dispara cuando se crea un nuevo cliente
export const sendEmailOnNewClient = onValueCreated("/clients/{clientId}", async (event) => {
  const clientData = event.data.val();

  const msg = {
    to: "solutionforlife2@gmail.com",
    from: "jeinerarenas435@gmail.com",
    subject: "Nuevo cliente registrado",
    html: `
      <h2>Nuevo Cliente Registrado</h2>
      <p><strong>Nombre:</strong> ${clientData.name}</p>
      <p><strong>Email:</strong> ${clientData.email}</p>
      <p><strong>Teléfono:</strong> ${clientData.phone}</p>
      <p><strong>Mensaje:</strong> ${clientData.message}</p>
      <br>
      <small>Este correo fue enviado automáticamente por Solution For Life</small>
  `,
  };

  try {
    await sgMail.send(msg);
    logger.info("Correo enviado con éxito");
  } catch (error) {
    logger.error("Error al enviar correo:", error);
  }
});
function onValueCreated(arg0: string, arg1: (event: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}

