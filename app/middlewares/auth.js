const { verifyToken } = require('../helpers/jwt');
const errors = require('../errors');

const getToken = headerToken => {
  const errorToken = errors.badRequestError('Invalid Token');
  try {
    const tokenHeader = headerToken || '';
    if (!tokenHeader) {
      throw errorToken;
    }
    const token = tokenHeader.split(' ')[1];
    return token;
  } catch {
    throw errorToken;
  }
};

exports.isAuthorized = (req, _, next) => {
  try {
    const token = getToken(req.headers.authorization);
    verifyToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
