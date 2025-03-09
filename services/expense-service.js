class ExpenseService {

    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    async getExpenseByUser(username) {
        return await this.expenseRepository.findExpensesByUser(username);
    }

    async getExpenseByID(expenseID) {
        return await this.expenseRepository.findExpenseByID(expenseID);
    }

    async createExpense(createExpenseDTO) {
        return await this.expenseRepository.createExpense(createExpenseDTO);
    }

    async updateExpense(updateExpenseDTO, expenseID) {
        return await this.expenseRepository.updateExpense(updateExpenseDTO, expenseID);
    }

    async deleteExpense(expenseID) {
        return await this.expenseRepository.deleteExpense(expenseID);
    }

}

export default ExpenseService;