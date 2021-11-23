// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { userEmailValidation, userVerifyUserByEmail, verifyPassword } = require('./middlewares/user');
const { createUser } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userEmailValidation, userVerifyUserByEmail, verifyPassword, createUser);
};
