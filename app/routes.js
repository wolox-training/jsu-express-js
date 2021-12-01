const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail, verifyCredentials } = require('./middlewares/user');
const { createUser, signIn } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSessionSchema } = require('./schemas/userSession');
const { schemaValidator } = require('./schemas/schemaValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userSchema(), schemaValidator, userVerifyUserByEmail, createUser);
  app.post('/users/sessions', userSessionSchema(), schemaValidator, verifyCredentials, signIn);
};
