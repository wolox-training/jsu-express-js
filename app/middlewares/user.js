const errors = require('../errors');
const userService = require('../services/user');

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
