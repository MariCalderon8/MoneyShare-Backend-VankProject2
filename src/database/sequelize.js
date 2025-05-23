import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     dialectOptions: {
//         ssl: true,
//         rejectUnauthorized: false,
//     }
// });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: false,
    }
});

async function connectSequelize() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        console.error('Error conectando a Postgres:', error);
        throw error;
    }
}

export { sequelize, connectSequelize };
