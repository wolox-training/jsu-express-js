const errors = require('../errors');
const userService = require('../services/user');
const { validateEmail, verifyPassword } = require('../helpers/validations');

exports.userEmailValidation = (req, _, next) => {
  const { body } = req;
  const { email } = body;
  try {
    if (validateEmail(email)) return next();
    return next(errors.badRequestError('Email Domain needs to be wolox.com.co'));
  } catch (error) {
    return next(error);
  }
};

exports.userVerifyUserByEmail = async (req, _, next) => {
  const { body } = req;
  const { email } = body;
  try {
    const isExistEmail = await userService.findUserByEmail(email);
    if (isExistEmail) return next(errors.badRequestError('Email already exist!'));
    return next();
  } catch {
    return next(errors.databaseError('Error to verify email'));
  }
};

exports.verifyPassword = (req, _, next) => {
  const {
    body: { password }
  } = req;
  if (verifyPassword(password)) return next();
  return next(errors.badRequestError("password doesn't meet the required characteristics"));
};
