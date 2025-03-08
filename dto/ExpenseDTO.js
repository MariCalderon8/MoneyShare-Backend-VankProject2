import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Expense = sequelize.define('expense', {
    id_expense: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_share: { 
        type: DataTypes.INTEGER, 
        references: { model: Share, key: 'id_share' }, 
        onDelete: 'CASCADE' 
    },
    amount: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    category: { 
        type: DataTypes.STRING(50) 
    },
    date: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'expense',
    timestamps: false
});

export default Expense;