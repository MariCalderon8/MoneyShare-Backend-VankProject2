import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const User = sequelize.define('user', {
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_user'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    }
}, {
    tableName: 'user', // Nombre de la tabla en la base de datos
    timestamps: false,
});

export default User;
