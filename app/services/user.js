const bcrypt = require('bcrypt');
const { Sequelize, ...db } = require('../models');
const errors = require('../errors');
const logger = require('../logger');

const { Op } = Sequelize;

const toEncrypt = data => {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

exports.verifyUniqueEmail = async email => {
  try {
    const emailUser = await db.User.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
    return emailUser;
  } catch {
    throw errors.databaseError('Error database at try to find email');
  }
};

exports.createUser = async user => {
  try {
    user.password = toEncrypt(user.password);
    const userCreated = await db.User.create(user);
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
