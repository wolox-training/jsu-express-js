const jwt = require('jsonwebtoken');
const config = require('../../config').common.api;
const errors = require('../errors');

exports.generateToken = payload => {
  try {
    return jwt.sign(payload, config.tokenSecret, { expiresIn: '1d' });
  } catch (error) {
    throw errors.apiError(error.message);
  }
};

exports.verifyToken = token => {
  try {
    return jwt.verify(token, config.tokenSecret);
  } catch {
    throw errors.forbiddenError('Error with token');
  }
};
