import express from 'express';
import ExpenseRepository from '../repositories/expense-repository.js';
import ExpenseService from '../services/expense-service.js';
import verifyToken from '../middleware/verifyToken.js'
import ExpenseController from '../controllers/expense-controller.js';
import expenseValidator from '../middleware/expenseValidator.js';



const router = express.Router();
const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(expenseRepository);
const expenseController = new ExpenseController(expenseService);

router.get('/:id', verifyToken, expenseController.findExpenseByID)
router.get('/user/:username', verifyToken, expenseController.findExpenseByUser)
router.post('/createExpense', verifyToken, expenseValidator.createExpenseValidator, expenseValidator.validatorExpense, expenseController.createExpense);
router.patch('/updateExpense/:id', verifyToken, expenseValidator.updateExpenseValidator, expenseValidator.validatorExpense,expenseController.updateExpense);
router.delete('/deleteExpense/:id', verifyToken, expenseController.deleteExpense);

export default router;
