import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ExpenseSplit = sequelize.define('expense_split', {
    id_split: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    percentage: { 
        type: DataTypes.DECIMAL(5,2) 
    },
    assigned_amount: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    }
}, {
    tableName: 'expense_split',
    timestamps: false
});

export default ExpenseSplit;
