// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { userEmailValidation, userVerifyUniqueEmail, verifyPassword } = require('./middlewares/user');
const { createUser } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', userEmailValidation, userVerifyUniqueEmail, verifyPassword, createUser);
};
