import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ExpenseSplit = sequelize.define('ExpenseSplit', {
    id_split: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_expense: {
        type: DataTypes.INTEGER
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

ExpenseSplit.associate = (models) =>{
    ExpenseSplit.belongsTo(models.Expense, { foreignKey: 'id_expense' }); // Un ExpenseSplit pertenece a un Expense
    ExpenseSplit.belongsTo(models.User, { foreignKey: 'id_user' }); // Un ExpenseSplit pertenece a un usuario
}
export default ExpenseSplit;
