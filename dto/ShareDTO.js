import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const Share = sequelize.define('Share', {
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

Share.associate = (models) => {
    Share.belongsToMany(models.User, { through: models.ShareMember, foreignKey: 'id_share' }); // Un share tiene muchos usuarios (ShareMembers)
    Share.hasOne(models.Expense, { foreignKey: 'id_share' }); // Un share tiene un expense
};

export default Share;