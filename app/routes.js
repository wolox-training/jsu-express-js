const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail } = require('./middlewares/user');
const { createUser, signIn } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSessionSchema, confirmPassword } = require('./schemas/user');
const { schemaValidator } = require('./schemas/schemaValidator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userSchema(), schemaValidator, userVerifyUserByEmail, createUser);
  app.post('/users/sessions', userSessionSchema(), schemaValidator, confirmPassword, signIn);
};
