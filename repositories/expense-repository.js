class ExpenseRepository {

    async findExpensesByUser(username){
        return `Los gastos de ${username} son: gasto1, gasto2, gasto3`
    }

    async findExpenseByID(expenseID) {
        return `Viaje a Santa Marta`
    }
    
    async createExpense(createExpenseDTO) {
      return "Gasto creado";
    }
  
    async updateExpense(updateExpenseDTO, expenseID) {
      return "Gasto modificado"
    }

    async deleteExpense(expenseID) {
        return "Gasto eliminado"
    }
  
}
  
export default ExpenseRepository;