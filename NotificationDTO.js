import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Notification = sequelize.define('notification', {
    id_notification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    type: { 
        type: DataTypes.ENUM('payment', 'debt', 'goal', 'general'), 
        allowNull: false 
    },
    date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'notification',
    timestamps: false
});
