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

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || origin === process.env.URL_FRONTEND ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
  credentials: true,
}));

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