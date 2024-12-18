const { body, validationResult } = require('express-validator');

const acceptedpayloadforupdate = ['first_name', 'last_name', 'password'];

const validateUpdateUserInfo = [
    body('first_name').trim().isAlpha().optional(),
    body('last_name').trim().isAlpha().optional(),
    body('password').trim().isLength({ min: 6 }).optional(),
    (req, res, next) => {
        const fields = Object.keys(req.body);
        const isValidforUpdate = fields.every((field) => acceptedpayloadforupdate.includes(field));
        if (!isValidforUpdate) {
            res.header('Cache-Control', 'no-store');
            res.header('Pragma', 'no-cache');
            res.header('Expires', '0');
            return res.status(400).send();
        }
        const error = validationResult(req);
        if (!error.isEmpty()) {
            res.header('Cache-Control', 'no-store');
            res.header('Pragma', 'no-cache');
            res.header('Expires', '0');
            return res.status(400).send();
        }
        next();
    }
];

module.exports = validateUpdateUserInfo;