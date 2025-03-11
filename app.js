import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import user from './routes/user.js';
import share from './routes/share.js';
import expense from './routes/expense.js';
import shareSplit from './routes/shareSplit.js';

import  { connectSequelize } from './database/sequelize.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()
  .use(bodyParser.json())
  .use(cookieParser(process.env.COOKIE_SECRET));

app.use('/user', user);
app.use('/share', share)
app.use('/expense', expense);
app.use('/share-split', shareSplit);

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