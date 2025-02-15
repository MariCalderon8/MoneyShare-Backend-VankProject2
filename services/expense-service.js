class ExpenseService {

    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    async getExpenseByUser(username) {
        let expenses = await this.expenseRepository.findExpensesByUser(username);
        return expenses
    }

    async getExpenseByID(expenseID) {
        let expense = await this.expenseRepository.findExpenseByID(expenseID);
        return expense
    }

    async createExpense(createExpenseDTO) {
        // Validación de que el gasto ya existe? Se necesita?
        await this.expenseRepository.createExpense(createExpenseDTO);
        return createExpenseDTO;
    }

    async updateExpense(updateExpense, expenseID) {
        await this.expenseRepository.updateExpense(updateExpense, expenseID);
        return updateExpense
    }

    async deleteExpense(expenseID) {
        await this.expenseRepository.deleteExpense(expenseID);
        return expenseID;
    }


}

export default ExpenseService;