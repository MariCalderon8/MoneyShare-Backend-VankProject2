import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ShareMember = sequelize.define('ShareMember', {
    id_share_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    id_share: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'share_member',
    timestamps: false
});

export default ShareMember;