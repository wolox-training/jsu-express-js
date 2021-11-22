const userService = require('../services/user');
const logger = require('../logger');
const toEncrypt = require('../helpers/encrypt');

const { createReponseUser } = require('../serializers/user');

const encryptPassword = (req, _, next) => {
  const passwordEncrypted = toEncrypt(req.body.password);
  req.body.password = passwordEncrypted;
  return next();
};

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = { ...body, password: encryptPassword(body.password) };
    logger.info('Creating user');
    const user = await userService.createUser(newUser);
    logger.info(`User ${user.firstName} was created successfull`);
    return res.status(200).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};
