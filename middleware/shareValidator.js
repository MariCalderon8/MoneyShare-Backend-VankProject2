import { check, validationResult } from "express-validator";

const createShareValidator = [
    check('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre es obligatorio y debe tener mínimo 3 caracteres y máximo 100 caracteres'),
    check('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto válido'),
    check('due_date')
    .optional()
    .isISO8601()
    .withMessage('La fecha de vencimiento debe estar en formato válido (YYYY-MM-DD)'),
];

const addMemberValidator = [
    check('id_user')
    .isInt()
    .withMessage('El id del usuario es obligatorio y debe ser un número válido'),
    check('id_share')
    .isInt()
    .withMessage('El id del share es obligatorio y debe ser un número válido'),
];


const updateShareValidator = [
    check('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre es obligatorio y debe tener mínimo 1 caracter y máximo 100 caracteres'),
    check('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto válido'),
    check('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('El monto debe ser un número válido y mayor a 0'),
    check('due_date')
    .optional()
    .isISO8601()
    .withMessage('La fecha de vencimiento debe estar en formato válido (YYYY-MM-DD)'),
];


function validatorShare(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default{
    createShareValidator,
    addMemberValidator,
    updateShareValidator,
    validatorShare
};