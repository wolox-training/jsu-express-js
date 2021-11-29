const userService = require('../services/user');
const logger = require('../logger');
const { toEncrypt } = require('../helpers/encrypt');
const { generateToken } = require('../helpers/jwt');
const { createReponseUser } = require('../serializers/user');

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = { ...body, password: toEncrypt(body.password) };
    logger.info('Creating user');
    const user = await userService.createUser(newUser);
    logger.info(`User ${user.firstName} was created successfull`);
    return res.status(201).send(createReponseUser(user));
  } catch (error) {
    return next(error);
  }
};

exports.signIn = (req, res) => {
  const emailUser = req.body.email;
  const token = generateToken({ email: emailUser });
  res.status(200).send({
    token,
    message: 'Successful authentication'
  });
};
