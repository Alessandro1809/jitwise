import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

 // Load environment variables from .env.local
 dotenv.config({ path: path.resolve(__dirname, '.env.local') });

(async () => {
  // Crea el transportador con Gmail
  // Si tu App Password viene con espacios, los eliminamos
  const cleanPass = process.env.EMAIL_PASS?.replace(/\s+/g, "") || "";
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPass,
    },
  });

  try {
    // Seleccionar un alias aleatorio para el remitente
    const aliases = (process.env.EMAIL_ALIASES || "").split(",").map(a => a.trim()).filter(Boolean);
    const fromAlias = aliases.length > 0
      ? aliases[Math.floor(Math.random() * aliases.length)]
      : `Jity <${process.env.EMAIL_USER}>`;
    const info = await transporter.sendMail({
      from: fromAlias,
      to: "alessandro@nous.cr",
      subject: "Prueba de correo desde Gmail alias",
      text: `¡Hola Ale! Este correo sale desde alias ${fromAlias}.`,
    });
    console.log(`Mensaje enviado desde alias: ${fromAlias}`, info.messageId);
  } catch (err) {
    console.error("Error al enviar correo:", err);
  }
})();
