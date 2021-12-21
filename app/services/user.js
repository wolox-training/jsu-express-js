const { User } = require('../models');
const errors = require('../errors');
const logger = require('../logger');
const { toEncrypt } = require('../helpers/encrypt');

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
    const userCreated = await User.create({ ...user, password: toEncrypt(user.password) });
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

exports.createOrUpdateUser = async user => {
  try {
    logger.info('Finding user to create or update to admin');
    const userCreatedOrUpdated = await User.findOne({ where: { email: user.email } }).then(obj => {
      if (obj) {
        logger.info('User finded ready to update to admin');
        return obj.update(user);
      }
      logger.info('User not found ready to create like admin');
      return User.create(user);
    });
    return userCreatedOrUpdated;
  } catch (error) {
    logger.info(error);
    throw errors.databaseError('database error to creating or updating user to admin');
  }
};

exports.findUsersPaginated = async ({ limit = 5, offset = 0 }) => {
  try {
    logger.info('Starting find users by page');
    const users = await User.findAndCountAll({
      limit,
      offset: limit * offset
    });
    return users;
  } catch (error) {
    logger.info(error);
    throw errors.databaseError('database error to find users paginated');
  }
};
