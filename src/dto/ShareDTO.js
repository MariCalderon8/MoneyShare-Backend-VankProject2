import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Share = sequelize.define('Share', {
    id_share: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_creator: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "User", key: "id_user" },
        onDelete: 'CASCADE'
    },
    type: {
        type: DataTypes.ENUM('share_expense', 'share_goal', 'share_debt'),
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
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
        defaultValue: 0 
    },
    paid_amount: { //Este aplica sólo para goals y debts
        type: DataTypes.DECIMAL(10,2), 
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('active', 'completed', 'expired'),
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    },
    due_date: { 
        type: DataTypes.DATE 
    }
}, {
    tableName: 'share',
    timestamps: false
});

Share.associate = (models) => {
    Share.belongsToMany(models.User, { through: 'share_member', foreignKey: 'id_share', otherKey: 'id_user', timestamps: false}); // Un share tiene muchos usuarios (ShareMembers)
    Share.belongsTo(models.User, { foreignKey: 'id_creator', onDelete: 'CASCADE' }); // Un share es creado por un usuario
    Share.hasMany(models.Expense, { foreignKey: 'id_share', onDelete: 'CASCADE' }); // Un share tiene un expense
    Share.hasMany(models.ShareSplit, { foreignKey: 'id_split', onDelete: 'CASCADE' });

};

export default Share;