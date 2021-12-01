const { validationResult } = require('express-validator');
const errors = require('../errors');

exports.schemaValidator = (req, _, next) => {
  const errorsValidation = validationResult(req);
  if (!errorsValidation.isEmpty()) {
    const errorRecord = errorsValidation.mapped();
    const values = Object.keys(errorRecord);
    const errorResponse = values.reduce((acc, key) => ({ ...acc, [key]: errorRecord[key].msg }), {});
    return next(errors.badRequestError(errorResponse));
  }
  return next();
};
