import express from 'express';

import verifyToken from "../middleware/verifyToken.js";
import NotificationRepository from "../repositories/notification-repository.js";
import NotificationService from "../services/notification-service.js";
import UserRepository from '../repositories/user-repository.js';
import UserService from '../services/user-service.js';
import NotificationController from '../controllers/notification-controller.js';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository, userService);

const notificationController = new NotificationController(notificationService);
router.get('/find/all', verifyToken, notificationController.findNotificationsByUser);
router.get('/find/:id', verifyToken, notificationController.findNotificationByID);
router.delete('/delete/:id', verifyToken, notificationController.deleteNotification);
router.delete('/all', verifyToken, notificationController.deleteAllNotifications);
router.post('/welcome', notificationController.createWelcomeNotification);

export default router; 
