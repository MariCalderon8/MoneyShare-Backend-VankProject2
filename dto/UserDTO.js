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
    tel: {
        type: DataTypes.STRING(15),
        allowNull: false,
    }
}, {
    tableName: 'user', // Nombre de la tabla en la base de datos
    timestamps: false,
});

User.associate = (models) => {
    User.belongsToMany(models.Share, { through: 'share_member', foreignKey: 'id_user' }); // Un usuario puede estar en muchos share 
    User.hasMany(models.ExpenseSplit, { foreignKey: 'id_user' }); // Un usuario puede tener muchas divisiones de gastos
    User.hasMany(models.Expense, { foreignKey: 'id_user' }); // Un usuario puede tener muchos subgastos
    User.hasMany(models.Share, { foreignKey: 'id_creator' }); // Un usuario puede estar en muchos shares
    User.hasMany(models.Notification, {foreignKey: 'id_user'}) // Un usuario tiene muchas notificaciones
};

export default User;
