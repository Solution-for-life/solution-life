import * as nodemailer from 'nodemailer';
import { logger } from 'firebase-functions/v1';
import { getEmailConfig, HOSTINGER_SMTP_CONFIG } from './email-config';

// Configuración SMTP para Hostinger
export const createHostingerTransporter = () => {
  const config = getEmailConfig();

  const transporter = nodemailer.createTransport({
    host: HOSTINGER_SMTP_CONFIG.host,
    port: HOSTINGER_SMTP_CONFIG.defaultPort,
    secure: HOSTINGER_SMTP_CONFIG.security.starttls,
    auth: {
      user: config.email,
      pass: config.password,
    },
    tls: {
      rejectUnauthorized: false, // Solo para desarrollo
    },
  });

  return transporter;
};

// Función para enviar email usando SMTP de Hostinger
export const sendEmailWithHostinger = async (
  to: string,
  subject: string,
  htmlContent: string,
  from?: string
) => {
  try {
    const transporter = createHostingerTransporter();

    // Verificar la conexión SMTP
    await transporter.verify();
    logger.info('✅ Conexión SMTP verificada exitosamente');

    const config = getEmailConfig();
    const mailOptions = {
      from: from || config.email || 'noreply@tudominio.com',
      to,
      subject,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    logger.info('📧 Email enviado exitosamente:', result.messageId);

    return result;
  } catch (error) {
    logger.error('❌ Error al enviar email con SMTP:', error);
    throw error;
  }
};

// Configuración alternativa para SSL (puerto 465)
export const createHostingerTransporterSSL = () => {
  const config = getEmailConfig();

  const transporter = nodemailer.createTransport({
    host: HOSTINGER_SMTP_CONFIG.host,
    port: HOSTINGER_SMTP_CONFIG.ports.ssl,
    secure: HOSTINGER_SMTP_CONFIG.security.ssl,
    auth: {
      user: config.email,
      pass: config.password,
    },
  });

  return transporter;
};
