import { sequelize } from '../database/sequelize.js';
import User from './UserDTO.js';
import Share from './ShareDTO.js';
import Expense from './ExpenseDTO.js';
import Notification from './NotificationDTO.js';
import ShareSplit from './ShareSplitDTO.js';

// Guardar todos los modelos en un objeto
const models = {
  User,
  Share,
  Expense,
  Notification,
  ShareSplit
};

// Inicializar las asociaciones pasando el objeto models a cada modelo
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };