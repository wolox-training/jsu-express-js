const errors = require('../errors');
const userService = require('../services/user');
const { compareEncrypt } = require('../helpers/encrypt');

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

exports.confirmPassword = async (req, _, next) => {
  try {
    const { body } = req;
    const { email, password } = body;
    const user = await userService.findUserByEmail(email);
    if (!user) return next(errors.badRequestError('User incorrect'));
    const passwordEncrypted = compareEncrypt(password, user.password);
    if (!passwordEncrypted) {
      return next(errors.badRequestError('Password incorrect'));
    }
    delete user.password;
    // eslint-disable-next-line
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
