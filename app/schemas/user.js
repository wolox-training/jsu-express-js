const { checkSchema } = require('express-validator');

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
      },
      matches: {
        options: /^\w+@wolox.com.(co|ar)$/g,
        errorMessage: 'Email Domain needs to be wolox.com.co'
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
        options: /^[a-zA-Z0-9_]{8,}$/g,
        errorMessage: "password doesn't meet the required characteristics, minimun lenght 7 and alphanumeric"
      }
    }
  });
  return check;
};
