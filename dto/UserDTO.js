import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0
    }
}, {
    tableName: 'user', // Nombre de la tabla en la base de datos
    timestamps: false,
});

User.associate = (models) => {
    User.belongsToMany(models.Share, { through: models.ShareMember, foreignKey: 'id_user' }); // Un usuario puede estar en muchos share 
    User.hasMany(models.ExpenseSplit, { foreignKey: 'id_user' }); // Un usuario puede tener muchos subgastos
    User.hasMany(models.Notification, {foreignKey: 'id_user'}) // Un usuario tiene muchas notificaciones
};

export default User;
