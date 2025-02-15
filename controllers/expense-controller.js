import { CreateExpenseDTO } from "../dto/expense/createExpenseDTO.js";
import { UpdateExpenseDTO } from "../dto/expense/updateExpenseDTO.js";

class ExpenseController {

    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    findExpenseByID = async (req, res) => {
        try {
            let id = req.params.id;
            const expense = await this.expenseService.getExpenseByID(id);
            res.status(200).json({
                message:
                    "Gasto encontrado", expense
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message:
                    error.message
            });
        }
    }

    findExpenseByUser = async (req, res) => {
        try {
            let username = req.params.username;
            const expenses = await this.expenseService.getExpenseByUser(username);
            res.status(200).json({
                message:
                    "Gastos encontrados", expenses
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message:
                    error.message
            });
        }
    }

    createExpense = async (req, res) => {
        try {
            const { name } = req.body;
            const createUserDTO = new CreateExpenseDTO(name);
            const expense = await this.expenseService.createExpense(createUserDTO);
            res.status(200).json({
                message:
                    "Gasto creado", expense
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message:
                    error.message
            });
        }
    }

    updateExpense = async (req, res) => {
        try {
            const { name, expenseID } = req.body;
            const updateExpenseDTO = new UpdateExpenseDTO(expenseID, name);
            const expense = await this.expenseService.updateExpense(updateExpenseDTO, expenseID);
            res.status(200).json({
                message:
                    "Gasto modificado", expense
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message:
                    error.message
            });
        }
    }

    deleteExpense = async (req, res) => {
        try {
            let id = req.params.id;
            const result = await this.expenseService.deleteExpense(id);
            res.status(200).json({
                message:
                    "Gasto eliminado", result
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({
                message:
                    error.message
            });
        }
    }

}


export default ExpenseController;