
class ExpenseController {

    constructor(expenseService) {
        this.expenseService = expenseService;
    }

    async findExpenseByID(req, res) {
        try {
            return res.status(200).json({
                data: await this.expenseService.getExpenseByID(req.params.id)
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async findExpenseByUser(req, res) {
        try {
            return res.status(200).json({
                data: await this.expenseService.getExpenseByUser(req.params.username)
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async createExpense(req, res) {
        try {
            return res.status(201).json({
                data: await this.expenseService.createExpense(req.body)
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async updateExpense(req, res) {
        try {
            return res.status(200).json({
                data: await this.expenseService.updateExpense(req.body, req.body.expenseID)
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async deleteExpense(req, res) {
        try {
            return res.status(200).json({
                data: await this.expenseService.deleteExpense(req.params.id)
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}


export default ExpenseController;