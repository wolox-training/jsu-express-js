const errors = require('../errors');
const userService = require('../services/user');

const validateEmail = email => {
  const re = /^\w+@wolox.com.co$/g;
  return re.test(email);
};

const verifyPassword = (password = '') => {
  const regexpEmail = /^[a-zA-Z0-9_]{8,}$/g;
  return regexpEmail.test(password);
};

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

exports.userVerifyUniqueEmail = async (req, _, next) => {
  const { body } = req;
  const { email } = body;
  try {
    const isExistEmail = await userService.verifyUniqueEmail(email);
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
