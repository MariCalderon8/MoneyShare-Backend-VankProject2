import express from 'express';

import verifyToken from '../middleware/verifyToken.js'
import ShareService from '../services/share-service.js';
import ShareRepository from '../repositories/share-repository.js';
import ShareController from '../controllers/share-controller.js';
import shareValidator from '../middleware/shareValidator.js';
import ShareSplitService from '../services/sharesplit-service.js';
import ShareSplitRepository from '../repositories/sharesplit-repository.js';


const router = express.Router();
const shareSplitRepository = new ShareSplitRepository();
const shareSplitService = new ShareSplitService(shareSplitRepository);
const shareRepository = new ShareRepository();
const shareService = new ShareService(shareRepository, shareSplitService);
const shareController = new ShareController(shareService);

router.get('/find/:id', verifyToken, shareController.findShareById)
router.get('/find/code/:code', verifyToken, shareController.findShareByCode)
router.post('/create', verifyToken, shareValidator.createShareValidator, shareValidator.validatorShare, shareController.createShare);
router.delete('/delete/:id', verifyToken, shareController.deleteShare);
router.patch('/update', verifyToken, shareValidator.updateShareValidator, shareValidator.validatorShare, shareController.updateShare);

router.post('/members', verifyToken, shareController.addMember);
router.delete('/members', verifyToken, shareController.removeMember);
router.patch('/percentages/:shareId', verifyToken, shareController.modifySplitsPercentages);
router.patch('/split-equally/:shareId', verifyToken, shareController.splitPercentagesEqually);



export default router;