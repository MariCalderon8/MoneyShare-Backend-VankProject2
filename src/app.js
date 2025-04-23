import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import user from './routes/user.js';
import share from './routes/share.js';
import expense from './routes/expense.js';
import shareSplit from './routes/shareSplit.js';
import notification from './routes/notification.js';
import { connectSequelize } from './database/sequelize.js';
import { models } from './dto/initializeDTOS.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:4200', // Permitir solo desde este origen
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Permitir ciertos métodos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir ciertos encabezados
}));

app.use('/user', user);
app.use('/share', share)
app.use('/expense', expense);
app.use('/share-split', shareSplit);
app.use('/notification', notification);

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