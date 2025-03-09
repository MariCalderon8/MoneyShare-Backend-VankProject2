class ExpenseRepository {

  async findExpensesByUser(username) {
    return `Los gastos de ${username} son: gasto1, gasto2, gasto3`
  }

  async findExpenseByID(expenseID) {
    return `Viaje a Santa Marta`
  }

  async createExpense(info) {
    const expense = await Expense.create(info);
    if (!expense) {
      throw new Error('Error al crear gasto');
    }
    return expense;
  }

  async updateExpense(info, expenseID) {
    const expense = await Expense.update(info, { where: { id: expenseID } });
    if (!expense) {
      throw new Error('Error al modificar gasto');
    }
    return expense;
  }

  async deleteExpense(expenseID) {
    const deleted = await Expense.destroy({ where: { id: expenseID } });
    if (!deleted) {
      throw new Error('Error al eliminar gasto');
    }
    return deleted;
  }

}

export default ExpenseRepository;