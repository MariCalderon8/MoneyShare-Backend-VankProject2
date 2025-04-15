import { check, validationResult } from "express-validator";

const createExpenseValidator = [
    check('id_share')
    .isInt()
    .withMessage('El id del share es obligatorio y debe ser un número válido'),
    check('amount')
    .isFloat({ min: 0.01 })
    .withMessage('El monto debe ser un número válido y mayor a 0'),
    check('category')
    .optional()
    .isString()
    .withMessage('La categoría debe ser un texto válido'),
    check('date')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)'),
    
];

const updateExpenseValidator = [
    check('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('El monto debe ser un número válido y mayor a 0'),
    check('category')
    .optional()
    .isString()
    .withMessage('La categoría debe ser un texto válido'),
    check('date')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe estar en formato válido (YYYY-MM-DD)'),

];

function validatorExpense(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default {
    createExpenseValidator,
    updateExpenseValidator,
    validatorExpense
}