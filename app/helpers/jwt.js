const jwt = require('jsonwebtoken');
const config = require('../../config').common.api;
const errors = require('../errors');
const logger = require('../logger');

const { tokenSecret, expirationToken } = config;

exports.generateToken = payload => {
  try {
    return jwt.sign(payload, tokenSecret, { expiresIn: expirationToken });
  } catch (error) {
    logger.info(error);
    throw errors.tokenError(error.message || 'Error to generate Token');
  }
};

exports.verifyToken = token => {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    logger.info(error);
    throw errors.tokenError('Invalid Token');
  }
};
