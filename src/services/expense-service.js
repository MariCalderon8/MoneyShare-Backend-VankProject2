class ExpenseService {

    constructor(expenseRepository, userService) {
        this.userService = userService;
        this.expenseRepository = expenseRepository;
    }

    async getExpenseByUser(username) {
        return await this.expenseRepository.findExpensesByUser(username);
    }

    async getExpenseByID(expenseID) {
        return await this.expenseRepository.findExpenseByID(expenseID);
    }

    async createExpense(expenseDTO, userEmail) {
        const userId = await this.userService.getIdByEmail(userEmail);
        console.log(userId);
        if (!userId) {
            throw new Error("Usuario no encontrado");
        }
        expenseDTO.id_user = userId;
        return await this.expenseRepository.createExpense(expenseDTO);
    }

    async updateExpense(updateExpenseDTO, expenseID) {
        return await this.expenseRepository.updateExpense(updateExpenseDTO, expenseID);
    }

    async deleteExpense(expenseID) {
        return await this.expenseRepository.deleteExpense(expenseID);
    }

}

export default ExpenseService;