const { checkSchema } = require('express-validator');

exports.listUserSchema = () => {
  const check = checkSchema({
    offset: {
      in: ['query'],
      errorMessage: 'offset is wrong',
      isInt: true,
      toInt: true
    },
    limit: {
      in: ['query'],
      errorMessage: 'limit is wrong',
      isInt: true,
      toInt: true
    }
  });
  return check;
};
