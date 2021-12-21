const userService = require('../services/user');
const logger = require('../logger');
const { generateToken } = require('../helpers/jwt');
const { createReponseUser, listUsers } = require('../serializers/user');
const roles = require('../constants/roles');

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = { ...body, role: roles.REGULAR_USER };
    logger.info('Creating user');
    const user = await userService.createUser(newUser);
    logger.info(`User ${user.firstName} was created successfull`);
    return res.status(201).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};

exports.createOrUpdateUserToAdmin = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await userService.createOrUpdateUser({ ...body, role: roles.ADMIN_USER });
    logger.info(`User ${user.firstName} was created or updated successfull`);
    return res.status(200).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};

exports.signIn = (req, res, next) => {
  try {
    const { email, id, firstName, lastName, role } = req.user;
    logger.info(`Generating token by ${email}`);
    const token = generateToken({ email, id, firstName, lastName, role });
    logger.info(`Token generated by ${email} was successfull`);
    return res.status(200).send({
      token,
      message: 'Successful authentication'
    });
  } catch (error) {
    logger.info(error);
    return next(error);
  }
};

exports.listUsersPaginated = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const userList = await userService.findUsersPaginated({ offset, limit });
    return res.status(200).send(listUsers(userList));
  } catch (error) {
    return next(error);
  }
};
