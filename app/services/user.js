const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

exports.findUserByEmail = async email => {
  try {
    const emailUser = await User.findOne({
      where: { email }
    });
    return emailUser;
  } catch (error) {
    logger.info(error.message);
    throw errors.databaseError('Error database at try to find email');
  }
};

exports.createUser = async user => {
  try {
    const userCreated = await User.create(user);
    if (userCreated) {
      return userCreated;
    }
    const errorMessage = `User ${user.firstName} couldn't be created`;
    logger.info(errorMessage);
    throw errors.databaseError(errorMessage);
  } catch (error) {
    logger.info(error);
    throw errors.databaseError('database error to create user created');
  }
};

exports.findUsers = async ({ limit = 5, offset = 0 }) => {
  try {
    const users = await User.findAndCountAll({
      limit,
      offset
    });
    return users;
  } catch (error) {
    logger.info(error);
    throw errors.databaseError('database error to create user created');
  }
};
