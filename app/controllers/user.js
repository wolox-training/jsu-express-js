const userService = require('../services/user');
const logger = require('../logger');
const toEncrypt = require('../helpers/encrypt');

const { createReponseUser } = require('../serializers/user');

const encryptPassword = password => toEncrypt(password);

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = { ...body, password: encryptPassword(body.password) };
    logger.info('Creating user');
    const user = await userService.createUser(newUser);
    logger.info(`User ${user.firstName} was created successfull`);
    return res.status(201).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};
