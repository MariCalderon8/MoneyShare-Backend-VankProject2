import express from 'express';
import ExpenseRepository from '../repositories/expense-repository.js';
import ExpenseService from '../services/expense-service.js';
import verifyToken from '../middleware/verifyToken.js'
import ExpenseController from '../controllers/expense-controller.js';


const router = express.Router();
const expenseRepository = new ExpenseRepository();
const expenseService = new ExpenseService(expenseRepository);
const expenseController = new ExpenseController(expenseService);

router.get('/:id', verifyToken, expenseController.findExpenseByID)
router.get('/user/:username', verifyToken, expenseController.findExpenseByUser)
router.post('/createExpense', verifyToken, expenseController.createExpense);
router.put('/updateExpense', verifyToken, expenseController.updateExpense);
router.delete('/deleteExpense/:id', verifyToken, expenseController.deleteExpense);

export default router;
