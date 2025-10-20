import * as functions from 'firebase-functions';

// Configuración de ambiente para SMTP
export const getEmailConfig = () => {
  // En producción, usar firebase functions:config
  // En desarrollo, usar variables de entorno del sistema
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    return {
      email: functions.config().hostinger?.email || '',
      password: functions.config().hostinger?.password || '',
      replyto: functions.config().hostinger?.replyto || '',
    };
  } else {
    return {
      email: process.env.HOSTINGER_EMAIL || '',
      password: process.env.HOSTINGER_PASSWORD || '',
      replyto: process.env.HOSTINGER_REPLYTO || '',
    };
  }
};

// Configuración de puertos SMTP para Hostinger
export const HOSTINGER_SMTP_CONFIG = {
  host: 'smtp.hostinger.com',
  ports: {
    starttls: 587,
    ssl: 465,
  },
  defaultPort: 587,
  security: {
    starttls: false, // false para STARTTLS
    ssl: true,       // true para SSL en puerto 465
  }
};
