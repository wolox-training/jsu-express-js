const { checkSchema } = require('express-validator');

exports.userSessionSchema = () => {
  const check = checkSchema({
    email: {
      exists: {
        errorMessage: 'Email should exist'
      }
    },
    password: {
      exists: {
        errorMessage: 'Password should exist'
      }
    }
  });
  return check;
};
