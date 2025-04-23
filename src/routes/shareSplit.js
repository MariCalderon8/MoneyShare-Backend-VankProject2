import express from 'express';

import verifyToken from '../middleware/verifyToken.js'
import ShareSplitRepository from '../repositories/sharesplit-repository.js';
import ShareSplitService from '../services/sharesplit-service.js';
import ShareSplitController from '../controllers/sharesplit-controller.js';
import NotificationService from '../services/notification-service.js';
import NotificationRepository from '../repositories/notification-repository.js';
import UserRepository from '../repositories/user-repository.js';
import UserService from '../services/user-service.js';
const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository, userService);

const shareSplitRepository = new ShareSplitRepository();
const shareSplitService = new ShareSplitService(shareSplitRepository, notificationService);
const shareSplitController = new ShareSplitController(shareSplitService);

router.get('/:id', verifyToken, shareSplitController.findSplitById)
router.get('/share/:id', verifyToken, shareSplitController.findSplitsByShare)
router.get('/count/:shareId', verifyToken, shareSplitController.countShareMembers)
router.get('/share/:shareId/user/:userId', verifyToken, shareSplitController.findSplitByUserShare)

//router.post('/', verifyToken, shareSplitController.createSplit);
router.delete('/:id', verifyToken, shareSplitController.deleteSplit);
//router.patch('/percentages/:shareId', verifyToken, shareSplitController.modifyPercentages);
//router.patch('/split-equally/:shareId', verifyToken, shareSplitController.splitEqually)

export default router;