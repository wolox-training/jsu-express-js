const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail } = require('./middlewares/user');
const { createUser } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSchemaValidator } = require('./schemas/schemaValidator');

const usersMiddlewares = [userSchema(), userSchemaValidator, userVerifyUserByEmail];

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', ...usersMiddlewares, createUser);
};
