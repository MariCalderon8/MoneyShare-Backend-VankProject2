import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Share = sequelize.define('share', {
    id_share: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    amount: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    due_date: { 
        type: DataTypes.DATE 
    }
}, {
    tableName: 'share',
    timestamps: false
});

export default Share;