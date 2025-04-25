class ExpenseService {

    constructor(expenseRepository, userService, shareService) {
        this.userService = userService;
        this.expenseRepository = expenseRepository;
        this.shareService = shareService;
    }

    async getExpenseByUser(username) {
        return await this.expenseRepository.findExpensesByUser(username);
    }

    async getExpenseByID(expenseID) {
        return await this.expenseRepository.findExpenseByID(expenseID);
    }

    async findExpensesByShare(shareId){
        const share = await this.shareService.findShareById(shareId);
        if(!share) {
            throw new Error("Share no encontrado")
        }

        return await this.expenseRepository.findExpensesByShare(shareId);
    }

    async findExpensesByShareUser(shareId, userId) {
        const share = await this.shareService.findShareById(shareId);
        if(!share) {
            throw new Error("Share no encontrado")
        }
        const user = await this.userService.findById(userId);
        if(!user) {
            throw new Error("Usuario no encontrado")
        }

        return await this.expenseRepository.findExpensesByShareUser(shareId, userId);
    }

    /**
     * Crea un gasto
     * @param {Object} expenseDTO - Los datos del gasto a crear
     * @param {string} userEmail - El email del usuario que crea el gasto
     * @returns {Promise<Object>} - El gasto creado
     */
    async createExpense(expenseDTO, userEmail) {
        const userId = await this.userService.getIdByEmail(userEmail);
        if (!userId) {
            throw new Error("Usuario no encontrado");
        }
        expenseDTO.id_user = userId;
        
        const expense = await this.expenseRepository.createExpense(expenseDTO);        
        
        // Recalcular los balances luego de crear el gasto
        await this.shareService.updateShareAfterExpense(expenseDTO.id_share, userId, expenseDTO.amount);
        
        return expense;
    }

    /**
     * Actualiza un gasto
     * @param {Object} updateExpenseDTO - Los datos del gasto a actualizar
     * @param {string} expenseID - El id del gasto a actualizar
     * @returns {Promise<Object>} - El gasto actualizado
     */
    async updateExpense(updateExpenseDTO, expenseID) {
        const originalExpense = await this.getExpenseByID(expenseID);
        if (!originalExpense) {
            throw new Error("Gasto no encontrado");
        }

        const updatedExpense = await this.expenseRepository.updateExpense(updateExpenseDTO, expenseID);
        
        // Si el monto cambia, actualizar el share y los balances
        if (originalExpense.amount !== updateExpenseDTO.amount) {
            const amountDifference = updateExpenseDTO.amount - originalExpense.amount;
            await this.shareService.updateShareAfterExpenseChange(
                originalExpense.id_share, 
                originalExpense.id_user, 
                parseFloat(amountDifference)
            );
        }
        return updatedExpense;
    }

    /**
     * Elimina un gasto y actualiza el share y balances
     * @param {string} expenseID - El id del gasto a eliminar
     * @returns {Promise<Object>} - El gasto eliminado
     */
    async deleteExpense(expenseID) {
        const expense = await this.getExpenseByID(expenseID);
        if (!expense) {
            throw new Error("Gasto no encontrado");
        }
        
        const deleted = await this.expenseRepository.deleteExpense(expenseID);
        
        // Actualizar el share y balances (resta el monto del gasto)
        await this.shareService.updateShareAfterExpenseChange(
            expense.id_share,
            expense.id_user,
            parseFloat(-expense.amount)
        );

        return deleted;
    }

}

export default ExpenseService;