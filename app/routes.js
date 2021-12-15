const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail, verifyCredentials } = require('./middlewares/user');
const { createUser, signIn, listUsersPaginated } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSessionSchema } = require('./schemas/userSession');
const { schemaValidator } = require('./schemas/schemaValidator');
const { listUserSchema } = require('./schemas/listUserSchema');
const { isAuthorized } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', isAuthorized, listUserSchema(), schemaValidator, listUsersPaginated);
  app.post('/users', userSchema(), schemaValidator, userVerifyUserByEmail, createUser);
  app.post('/users/sessions', userSessionSchema(), schemaValidator, verifyCredentials, signIn);
};
