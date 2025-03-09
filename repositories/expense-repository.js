import ExpenseSplit from "../dto/ExpenseSplit.js";
import Expense from "../dto/ExpenseDTO.js";

class ExpenseRepository {

  async findExpensesByUser(username) {
    return await Expense.findAll({
      include: [
        {
          model: ExpenseSplit,
          where: { id_user: username },
        },
      ],
    });
  }

  async findExpenseByID(expenseID) {
    return await Expense.findOne({ where: { id_expense: expenseID } });
  }

  async createExpense(info) {
    const expense = await Expense.create(info);
    if (!expense) {
      throw new Error('Error al crear gasto');
    }
    return expense;
  }

  // async updateExpense(info, expenseID) {
  //   const expense = await Expense.update(info, { where: { id: expenseID } });
  //   if (!expense) {
  //     throw new Error('Error al modificar gasto');
  //   }
  //   return expense;
  // }

  async updateExpense(info, expenseID) {
    const updatedRows = await Expense.update(info, {
      where: { id_expense: expenseID },
      returning: true, // Devuelve el objeto actualizado
    });

    if (!updatedRows[1][0]) {
      throw new Error("Error al modificar gasto o no encontrado.");
    }
    return updatedRows[1][0];
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