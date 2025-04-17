import Expense from "../dto/ExpenseDTO.js";

class ExpenseRepository {

  async findExpenseByID(expenseID) {
    return await Expense.findOne({ where: { id_expense: expenseID } });
  }

  async findExpensesByShare(shareId) {
    return await Expense.findAll({
      where: {id_share: shareId}
    });
  }

  async findExpensesByShareUser(shareId, userId) {
    return await Expense.findAll({
      where: {
        id_share: shareId,
        id_user: userId
      }
    })
  }

  async createExpense(info) {
    const expense = await Expense.create(info);
    if (!expense) {
      throw new Error('Error al crear gasto');
    }
    return expense;
  }

  async updateExpense(expenseData, expenseID) {
    const [updatedRows] = await Expense.update(expenseData, {
      where: { id_expense: Number(expenseID) }
    });
    console.log(expenseData, expenseID);
    console.log(updatedRows);

    if (updatedRows > 0) {
      const updatedExpense = await Expense.findOne({
        where: {
          id_expense: Number(expenseID)
        }
      });
      return updatedExpense;
    } else {
      throw new Error('No se encontró el expense para actualizar');
    }
  }

  async deleteExpense(expenseID) {
    const deleted = await Expense.destroy({ where: { id_expense: expenseID } });
    if (!deleted) {
      throw new Error('Error al eliminar gasto');
    }
    return deleted;
  }

}

export default ExpenseRepository;