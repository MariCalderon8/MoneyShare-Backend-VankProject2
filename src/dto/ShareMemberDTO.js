import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ShareMember = sequelize.define('ShareMember', {
    id_share: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email_user: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    amount_to_pay: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    tableName: 'view_share_members',
    timestamps: false, 
    freezeTableName: true 
});

export default ShareMember;