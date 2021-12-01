const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail, verifyCredentials } = require('./middlewares/user');
const { createUser, signIn } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSessionSchema } = require('./schemas/userSession');
const { schemaValidator } = require('./schemas/schemaValidator');
const { listUserSchema } = require('./schemas/listUserSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', listUserSchema(), schemaValidator);
  app.post('/users', userSchema(), schemaValidator, userVerifyUserByEmail, createUser);
  app.post('/users/sessions', userSessionSchema(), schemaValidator, verifyCredentials, signIn);
};
