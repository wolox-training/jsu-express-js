const { checkSchema } = require('express-validator');
const errors = require('../errors');
const userService = require('../services/user');
const { validateEmail, verifyPassword } = require('../helpers/validations');
const { compareEncrypt } = require('../helpers/encrypt');

exports.userSessionSchema = () => {
  const check = checkSchema({
    email: {
      exists: {
        errorMessage: 'Email should exist'
      },
      isString: {
        errorMessage: 'Email should be string'
      },
      isEmail: {
        if: email => validateEmail(email),
        errorMessage: 'Email should be email @wolox.com.co'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password should exist'
      },
      isString: {
        errorMessage: 'Password name should be string'
      },
      matches: {
        if: password => verifyPassword(password),
        errorMessage: 'Password should be alphanumeric and lenght greather than equal 7'
      }
    }
  });
  return check;
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
    return next();
  } catch (error) {
    return next(error);
  }
};
