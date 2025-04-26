import { check, validationResult } from "express-validator";

const registerValidator = [
    check('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre es obligatorio y debe tener mínimo 3 caracteres y máximo 100 caracteres'),

    check('email')
    .isEmail()
    .withMessage('El email es obligatorio y debe ser un email válido'),

    check('username')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('El username es obligatorio, debe tener mínimo 3 carcateres y  máximo 100 caracteres'),

    check('password')
    .isLength({ min: 8, max: 100 })
    .withMessage('La contraseña es obligatoria y debe tener mínimo 8 caracteres y máximo 100 caracteres')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe tener al menos una letra mayúscula')
    .matches(/[0-9]/)
    .withMessage('La contraseña debe tener al menos un número')
    .matches(/[!@#$%^&*()_+\-=\[\]{};'"\\|,.<>\/?]/)
    .withMessage('La contraseña debe tener al menos un caracter especial'),

    check('tel')
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto')
    .matches(/^\d{10,15}$/)
    .withMessage('El teléfono debe contener entre 10 y 15 dígitos numéricos')
];

const loginValidator = [
    check('email')
    .notEmpty()
    .withMessage('El email no es válido'),

    check('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
];

const updateUserValidator = [
    check('name')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre es obligatorio y debe tener mínimo 3 caracteres y máximo 100 caracteres'),

    check('email')
    .isEmail()
    .withMessage('El email es obligatorio y debe ser un email válido'),

    check('username')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('El username es obligatorio, debe tener mínimo 3 carcateres y  máximo 100 caracteres'),

    check('tel')
    .isString()
    .withMessage('El teléfono debe ser una cadena de texto')
    .matches(/^\d{10,15}$/)
    .withMessage('El teléfono debe contener entre 10 y 15 dígitos numéricos')
];

function validatorUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default{
    registerValidator,
    loginValidator,
    updateUserValidator,
    validatorUser
}