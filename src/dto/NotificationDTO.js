import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Notification = sequelize.define('Notification', {
    id_notification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
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

Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'id_user' })
}
export default Notification;