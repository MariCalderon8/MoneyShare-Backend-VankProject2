import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Expense = sequelize.define('Expense', {
    id_expense: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_share: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Share", key: "id_share" },
        onDelete: 'CASCADE'
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "User", key: "id_user" },
        onDelete: 'CASCADE'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
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
    Expense.belongsTo(models.Share, { foreignKey: 'id_share', onDelete: 'CASCADE' }); 
    Expense.belongsTo(models.User, { foreignKey: 'id_user', onDelete: 'CASCADE' });
};


export default Expense;