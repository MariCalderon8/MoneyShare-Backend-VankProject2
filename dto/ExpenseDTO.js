import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Expense = sequelize.define('Expense', {
    id_expense: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_share: { 
        type: DataTypes.INTEGER
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

Expense.associate = (models) => {
    Expense.belongsTo(models.Share, { foreignKey: 'id_share' }); // Un Expense es un share
    Expense.hasMany(models.ExpenseSplit, {foreignKey: 'id_expense'}); // Un Expense tiene muchos ExpenseSplit
}

export default Expense;