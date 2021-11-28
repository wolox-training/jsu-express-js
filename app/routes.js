// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const {
  userVerifyUserByEmail,
  verifyPassword,
  userSchema,
  userSchemaValidator,
  userEmailValidation,
} = require('./middlewares/user');
const { createUser } = require('./controllers/user');

const usersMiddlewares = [
  userSchema(),
  userSchemaValidator,
  userVerifyUserByEmail,
  userEmailValidation,
  verifyPassword
];

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', ...usersMiddlewares, createUser);
};
