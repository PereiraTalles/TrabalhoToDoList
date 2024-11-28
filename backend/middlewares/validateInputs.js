const { validationResult } = require("express-validator");

exports.validateInputs = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Erro ao validar entradas de usuário')
            error.statusCode = 400;
            error.details = errors.array();

            return next(error);
        }

        next();
    } catch (err) {
        next(err);
    }
}