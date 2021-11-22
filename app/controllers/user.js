const userService = require('../services/user');
const logger = require('../logger');
const { createReponseUser } = require('../serializers/user');

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    logger.info('Creating user');
    const user = await userService.createUser(body);
    logger.info(`User ${user.firstName} was created successfull`);
    return res.status(200).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};
