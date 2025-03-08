import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const ShareMember = sequelize.define('share_member', {
    id_share_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    tableName: 'share_member',
    timestamps: false
});

export default ShareMember;