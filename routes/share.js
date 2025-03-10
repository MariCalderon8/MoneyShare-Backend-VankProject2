import express from 'express';

import verifyToken from '../middleware/verifyToken.js'
import ShareService from '../services/share-service.js';
import ShareRepository from '../repositories/share-repository.js';
import ShareController from '../controllers/share-controller.js';

const router = express.Router();
const shareRepository = new ShareRepository();
const shareService = new ShareService(shareRepository);
const shareController = new ShareController(shareService);

router.get('/find/:id', verifyToken, shareController.findShareById)
router.post('/create', verifyToken, createShareValidator.createShareValidator, shareValidator.validatorShare, shareController.createShare);
router.delete('/delete/:id', verifyToken, shareValidator.updateShareValidator, shareValidator.validatorShare, shareController.deleteShare);
router.patch('/update', verifyToken, shareController.updateShare);

export default router;