# Configuración SMTP con Hostinger para Firebase Functions

## 🚀 Configuración Inicial

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `functions/` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de Hostinger:

```env
# Email de tu cuenta de Hostinger
HOSTINGER_EMAIL=tu-email@tudominio.com

# Contraseña de tu email de Hostinger  
HOSTINGER_PASSWORD=tu-contraseña-segura
```

### 2. Configurar Firebase Functions

Para usar variables de entorno en producción, configúralas usando Firebase CLI:

```bash
# Configurar email de Hostinger
firebase functions:config:set hostinger.email="tu-email@tudominio.com"

# Configurar contraseña de Hostinger
firebase functions:config:set hostinger.password="tu-contraseña-segura"

# Ver la configuración actual
firebase functions:config:get
```

### 3. Actualizar el código para producción

Para usar las variables de Firebase Config en lugar de process.env, actualiza `smtp-config.ts`:

```typescript
// En lugar de process.env, usa functions.config()
const HOSTINGER_EMAIL = functions.config().hostinger?.email || '';
const HOSTINGER_PASSWORD = functions.config().hostinger?.password || '';
```

## 📧 Configuración SMTP de Hostinger

### Parámetros de Servidor SMTP:

- **Servidor SMTP**: `smtp.hostinger.com`
- **Puerto STARTTLS**: `587` (recomendado)
- **Puerto SSL**: `465` (alternativo)
- **Seguridad**: STARTTLS o SSL/TLS
- **Autenticación**: Requerida

### Configurar Email en Hostinger:

1. Accede a tu panel de control de Hostinger
2. Ve a **Correos electrónicos** → **Gestionar**
3. Crea una cuenta de email si no tienes una
4. Asegúrate de que la cuenta tenga permisos SMTP habilitados

## 🧪 Funciones Disponibles

### 1. `sendEmailOnNewClient`
- **Tipo**: Database Trigger
- **Dispara**: Cuando se crea un nuevo cliente en `/clients/{clientId}`
- **Acción**: Envía email usando SMTP de Hostinger

### 2. `testSMTPConnection`
- **Tipo**: HTTP Function
- **URL**: `https://tu-proyecto.cloudfunctions.net/testSMTPConnection`
- **Método**: GET
- **Propósito**: Probar la conexión SMTP con Hostinger

### 3. `sendTestEmail`
- **Tipo**: HTTP Function  
- **URL**: `https://tu-proyecto.cloudfunctions.net/sendTestEmail`
- **Método**: POST
- **Body**:
```json
{
  "to": "destinatario@email.com",
  "subject": "Asunto del email",
  "message": "Mensaje de prueba"
}
```

## 🔧 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo local
npm run serve

# Compilar TypeScript
npm run build

# Desplegar a Firebase
npm run deploy

# Ver logs
npm run logs
```

## ✅ Probar la Configuración

### 1. Probar conexión SMTP:
```bash
curl https://tu-proyecto.cloudfunctions.net/testSMTPConnection
```

### 2. Enviar email de prueba:
```bash
curl -X POST https://tu-proyecto.cloudfunctions.net/sendTestEmail \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Prueba SMTP",
    "message": "Este es un mensaje de prueba"
  }'
```

### 3. Probar trigger de nuevo cliente:
Crea un nuevo registro en Firebase Database en la ruta `/clients/` y verifica que se envíe el email.

## 🛠️ Troubleshooting

### Error de Autenticación:
- Verifica que el email y contraseña sean correctos
- Asegúrate de que la cuenta tenga SMTP habilitado en Hostinger
- Revisa si necesitas habilitar "Aplicaciones menos seguras" (aunque Hostinger generalmente no lo requiere)

### Error de Conexión:
- Verifica que el puerto 587 no esté bloqueado
- Intenta usar el puerto 465 con SSL si 587 falla
- Revisa la configuración del firewall

### Variables de Entorno:
- En desarrollo local, usa archivos `.env`
- En producción, usa `firebase functions:config:set`
- Las variables deben coincidir entre ambos entornos

## 📚 Documentación Adicional

- [Nodemailer Documentation](https://nodemailer.com/)
- [Firebase Functions Environment Config](https://firebase.google.com/docs/functions/config-env)
- [Hostinger Email Setup Guide](https://support.hostinger.com/en/articles/1583229-how-to-set-up-an-email-account)
