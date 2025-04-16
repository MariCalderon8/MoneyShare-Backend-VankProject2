import express from 'express';

import verifyToken from '../middleware/verifyToken.js'
import ShareService from '../services/share-service.js';
import ShareRepository from '../repositories/share-repository.js';
import ShareController from '../controllers/share-controller.js';
import shareValidator from '../middleware/shareValidator.js';
import ShareSplitService from '../services/sharesplit-service.js';
import ShareSplitRepository from '../repositories/sharesplit-repository.js';
import UserRepository from '../repositories/user-repository.js';
import UserService from '../services/user-service.js';
import ShareMemberRespository from '../repositories/sharemember-repository.js';
import ShareMemberService from '../services/sharemember-service.js';


const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const shareSplitRepository = new ShareSplitRepository();
const shareSplitService = new ShareSplitService(shareSplitRepository);

const shareMemberRepository = new ShareMemberRespository();
const shareMemberService = new ShareMemberService(shareMemberRepository);

const shareRepository = new ShareRepository();
const shareService = new ShareService(shareRepository, shareSplitService, userService, shareMemberService);
const shareController = new ShareController(shareService);


router.get('/find/:id', verifyToken, shareController.findShareById)
router.get('/find/code/:code', verifyToken, shareController.findShareByCode)
router.post('/create', verifyToken, shareValidator.createShareValidator, shareValidator.validatorShare, shareController.createShare);
router.delete('/delete/:id', verifyToken, shareController.deleteShare);
router.patch('/update', verifyToken, shareValidator.updateShareValidator, shareValidator.validatorShare, shareController.updateShare);

router.post('/members/add', verifyToken, shareController.addMember);
router.delete('/members/remove', verifyToken, shareController.removeMember);
router.patch('/members/percentages/:shareId', verifyToken, shareController.modifySplitsPercentages);
router.patch('/members/split-equally/:shareId', verifyToken, shareController.splitPercentagesEqually);

router.get('/members/all/:idShare', verifyToken, shareController.findMembersByShare);
router.get('/members/debts/:idShare', verifyToken, shareController.findMembersWithDebt);
router.get('/members/overloads/:idShare', verifyToken, shareController.findMembersWithOverload);

export default router;