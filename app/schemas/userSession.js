const { checkSchema } = require('express-validator');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../constants/regexp');

exports.userSessionSchema = () => {
  const check = checkSchema({
    email: {
      exists: {
        errorMessage: 'Email should exist'
      },
      isString: {
        errorMessage: 'Email should be string'
      },
      matches: {
        options: EMAIL_REGEXP,
        errorMessage: 'Email Domain needs to be @wolox.com.(co | ar)'
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
        options: PASSWORD_REGEXP,
        errorMessage: "password doesn't meet the required characteristics, minimun lenght 8 and alphanumeric"
      }
    }
  });
  return check;
};
