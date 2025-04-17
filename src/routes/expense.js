import express from 'express';
import ExpenseRepository from '../repositories/expense-repository.js';
import ExpenseService from '../services/expense-service.js';
import verifyToken from '../middleware/verifyToken.js'
import ExpenseController from '../controllers/expense-controller.js';
import expenseValidator from '../middleware/expenseValidator.js';
import UserService from '../services/user-service.js';
import UserRepository from '../repositories/user-repository.js';
import ShareSplitService from '../services/sharesplit-service.js';
import ShareMemberRespository from '../repositories/sharemember-repository.js';
import ShareService from '../services/share-service.js';
import ShareRepository from '../repositories/share-repository.js';
import ShareSplitRepository from '../repositories/sharesplit-repository.js';
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

const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(expenseRepository, userService, shareService);
const expenseController = new ExpenseController(expenseService);

router.get('/:id', verifyToken, expenseController.findExpenseByID)
router.get('/user/:username', verifyToken, expenseController.findExpenseByUser)
router.post('/createExpense', verifyToken, expenseValidator.createExpenseValidator, expenseValidator.validatorExpense, expenseController.createExpense);
router.patch('/updateExpense/:id', verifyToken, expenseValidator.updateExpenseValidator, expenseValidator.validatorExpense,expenseController.updateExpense);
router.delete('/deleteExpense/:id', verifyToken, expenseController.deleteExpense);

export default router;
