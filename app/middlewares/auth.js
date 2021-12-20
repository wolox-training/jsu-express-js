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

exports.isAuthorizedByRoles = (...permittedRoles) => (req, res, next) => {
  const { headers } = req;
  const token = getToken(headers.authorization);
  const payloadToken = verifyToken(token);
  if (payloadToken && permittedRoles.includes(payloadToken.role)) return next();
  return res.status(403).json({ message: 'Forbidden' });
};
