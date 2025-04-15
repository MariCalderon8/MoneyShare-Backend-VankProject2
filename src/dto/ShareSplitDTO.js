import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ShareSplit = sequelize.define('ShareSplit', {
    id_split: {
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
    percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0
    },
    assigned_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false
    },
    paid: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false
    }
}, {
    tableName: 'share_split',
    timestamps: false
});

ShareSplit.associate = (models) => {
    ShareSplit.belongsTo(models.Share, { foreignKey: 'id_share', onDelete: 'CASCADE' });
    ShareSplit.belongsTo(models.User, { foreignKey: 'id_user', onDelete: 'CASCADE' });
};

export default ShareSplit;
