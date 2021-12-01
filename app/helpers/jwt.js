const jwt = require('jsonwebtoken');
const config = require('../../config').common.api;
const errors = require('../errors');
const logger = require('../logger');

exports.generateToken = payload => {
  try {
    return jwt.sign(payload, config.tokenSecret, { expiresIn: config.expirationToken });
  } catch (error) {
    logger.info(error);
    throw errors.apiError(error.message);
  }
};

exports.verifyToken = token => {
  try {
    return jwt.verify(token, config.tokenSecret);
  } catch (error) {
    logger.info(error);
    throw errors.forbiddenError('Error with token');
  }
};
