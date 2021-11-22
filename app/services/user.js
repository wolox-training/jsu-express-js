const models = require('../models');
const errors = require('../errors');
const logger = require('../logger');
const toEncrypt = require('../helpers/encrypt');

const { User } = models;

exports.verifyUniqueEmail = async email => {
  try {
    const emailUser = await User.findOne({
      where: { email }
    });
    return emailUser;
  } catch {
    throw errors.databaseError('Error database at try to find email');
  }
};

exports.createUser = async user => {
  try {
    user.password = toEncrypt(user.password);
    const userCreated = await User.create(user);
    if (userCreated) {
      return userCreated;
    }
    const errorMessage = `User ${user.firstName}  couldn't be created`;
    logger.info(errorMessage);
    throw errors.databaseError(errorMessage);
  } catch {
    throw errors.databaseError('database error to create user created');
  }
};
