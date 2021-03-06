const errors = require('../errors');
const userService = require('../services/user');
const { compareEncrypt } = require('../helpers/encrypt');
const logger = require('../logger');

exports.userVerifyUserByEmail = async (req, _, next) => {
  const { body } = req;
  const { email } = body;
  try {
    const isExistEmail = await userService.findUserByEmail(email);
    if (isExistEmail) return next(errors.badRequestError('Email already exist!'));
    return next();
  } catch (error) {
    logger.info(error);
    return next(error);
  }
};

exports.verifyCredentials = async (req, _, next) => {
  try {
    const errorResponse = errors.badRequestError('Email or password incorrect');
    const { body } = req;
    const { email, password } = body;
    const user = await userService.findUserByEmail(email);
    if (!user) return next(errorResponse);
    const passwordEncrypted = compareEncrypt(password, user.password);
    if (!passwordEncrypted) {
      return next(errorResponse);
    }
    delete user.password;
    // eslint-disable-next-line
    req.user = user;
    return next();
  } catch (error) {
    logger.info(error);
    return next(error);
  }
};
