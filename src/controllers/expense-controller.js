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
            return res.status(200).json({data: expense});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    findExpenseByUser = async (req, res) => {
        try {
            const expenses = await this.expenseService.getExpenseByUser(req.params.username);
            return res.status(200).json({data: expenses});
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    findExpensesByShare = async (req, res) => {
        try {
            const expenses = await this.expenseService.findExpensesByShare(req.params.shareId);
            return res.status(200).json({data: expenses});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    findExpensesByShareUser = async (req, res) => {
        try {
            const expenses = await this.expenseService.findExpensesByShareUser(req.params.shareId, req.params.userId);
            return res.status(200).json({data: expenses});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    createExpense = async (req, res) => {
        try {
            const expense = await this.expenseService.createExpense(req.body, req.dataToken.userEmail);
            return res.status(201).json({data: expense});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };
    
    updateExpense = async (req, res) => {
        try {
            const updatedExpense = await this.expenseService.updateExpense(req.body, req.params.id);
            return res.status(200).json({data: updatedExpense});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

    deleteExpense = async (req, res) => {
        try {
            await this.expenseService.deleteExpense(req.params.id);
            return res.status(200).json({ message: "Gasto eliminado correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    };

}


export default ExpenseController;