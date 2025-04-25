import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import user from './routes/user.js';
import share from './routes/share.js';
import expense from './routes/expense.js';
import shareSplit from './routes/shareSplit.js';
import notification from './routes/notification.js';
import aiChat from './routes/aichat.js';
import { connectSequelize } from './database/sequelize.js';
import { models } from './dto/initializeDTOS.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET));

// app.use(cors({
//   origin: process.env.URL_FRONTEND || 'http://localhost:4200', // Permitir solo desde este origen
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Permitir ciertos métodos
//   allowedHeaders: ['Content-Type', 'Authorization'] // Permitir ciertos encabezados
// }));

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    // Permitir solicitudes desde cualquier origen en desarrollo
    // En producción, especificar el dominio exacto del frontend
    origin: process.env.URL_FRONTEND || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir cookies en solicitudes cross-origin
  }),
)

// Ruta raíz para verificar que la API está funcionando
app.get("/", (req, res) => {
  res.status(200).json({
    message: "MoneyShare API está funcionando correctamente",
    version: "1.0.0",
    endpoints: {
      user: "/user",
      share: "/share",
      expense: "/expense",
      shareSplit: "/share-split",
      notification: "/notification",
      aiChat: "/ai-chat",
    },
  })
})

// Ruta de health check para monitoreo
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() })
})

app.use('/user', user);
app.use('/share', share)
app.use('/expense', expense);
app.use('/share-split', shareSplit);
app.use('/notification', notification);
app.use('/ai-chat', aiChat);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" })
})

async function startServer() {
  try {
    await connectSequelize();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error iniciando la aplicación:', error);
  }
}

startServer();