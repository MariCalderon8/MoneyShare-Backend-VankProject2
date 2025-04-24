import express from 'express';
import AIService from '../services/ai-service.js';
import AIController from '../controllers/ai-controller.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const aiService = new AIService();
const aiController = new AIController(aiService);

router.post('/send-message', verifyToken, aiController.sendMessage);
router.delete('/delete-history', verifyToken, aiController.deleteHistory);
export default router;

