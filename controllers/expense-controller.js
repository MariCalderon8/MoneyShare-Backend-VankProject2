class ExpenseController {

    constructor(expenseService) {
        this.expenseService = expenseService;
    }

    findExpenseByID = async (req, res) => {
        try {
            const expense = await this.expenseService.getExpenseByID(req.params.id);
            if (!expense) {
                return res.status(404).json({ message: "Gasto no encontrado" });
            }
            return res.status(200).json(expense);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    findExpenseByUser = async (req, res) => {
        try {
            const expenses = await this.expenseService.getExpenseByUser(req.params.username);
            return res.status(200).json(expenses);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    createExpense = async (req, res) => {
        try {
            const expense = await this.expenseService.createExpense(req.body);
            return res.status(201).json(expense);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    updateExpense = async (req, res) => {
        try {
            const updatedExpense = await this.expenseService.updateExpense(req.params.id, req.body);
            return res.status(200).json(updatedExpense);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    deleteExpense = async (req, res) => {
        try {
            await this.expenseService.deleteExpense(req.params.id);
            return res.status(200).json({ message: "Gasto eliminado correctamente" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

}


export default ExpenseController;