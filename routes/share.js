import express from 'express';

import verifyToken from '../middleware/verifyToken.js'
import ShareService from '../services/share-service.js';
import ShareRepository from '../repositories/share-repository.js';
import ShareController from '../controllers/share-controller.js';
import shareValidator from '../middleware/shareValidator.js';


const router = express.Router();
const shareRepository = new ShareRepository();
const shareService = new ShareService(shareRepository);
const shareController = new ShareController(shareService);

router.get('/find/:id', verifyToken, shareController.findShareById)
router.get('/find/code/:code', verifyToken, shareController.findShareByCode)
router.post('/create', verifyToken, shareValidator.createShareValidator, shareValidator.validatorShare, shareController.createShare);
router.delete('/delete/:id', verifyToken, shareController.deleteShare);
router.patch('/update', verifyToken, shareValidator.updateShareValidator, shareValidator.validatorShare, shareController.updateShare);
router.post('/:id/members', verifyToken, shareController.addMember);

export default router;