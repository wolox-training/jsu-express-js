const { checkSchema, validationResult } = require('express-validator');
const { first } = require('lodash/fp');
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

exports.userSchema = () => {
  const check = checkSchema({
    firstName: {
      exists: {
        errorMessage: 'First name should exist'
      },
      isString: {
        errorMessage: 'First name should be string'
      }
    },
    lastName: {
      exists: {
        errorMessage: 'Last name should exist'
      },
      isString: {
        errorMessage: 'Last name should be string'
      }
    },
    email: {
      exists: {
        errorMessage: 'Email should exist'
      },
      isString: {
        errorMessage: 'Email should be string'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password should exist'
      },
      isString: {
        errorMessage: 'Password name should be string'
      }
    }
  });
  return check;
};

exports.userSchemaValidator = (req, _, next) => {
  const errorsValidation = validationResult(req);
  if (!errorsValidation.isEmpty()) {
    const errorReq = errorsValidation.array({ onlyFirstError: true });
    const error = first(errorReq);
    return next(errors.badRequestError(error ? error.msg : 'Bad request'));
  }
  return next();
};
