const { healthCheck } = require('./controllers/healthCheck');
const { userVerifyUserByEmail, verifyCredentials } = require('./middlewares/user');
const { createUser, createOrUpdateUserToAdmin, signIn, listUsersPaginated } = require('./controllers/user');
const { userSchema } = require('./schemas/user');
const { userSessionSchema } = require('./schemas/userSession');
const { schemaValidator } = require('./schemas/schemaValidator');
const { listUserSchema } = require('./schemas/listUserSchema');
const { isAuthorized, isAuthorizedByRoles } = require('./middlewares/auth');
const { searchWeet } = require('./middlewares/weet');
const { createWeet } = require('./controllers/weet');
const roles = require('./constants/roles');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', isAuthorized, listUserSchema(), schemaValidator, listUsersPaginated);
  app.post('/users', userSchema(), schemaValidator, userVerifyUserByEmail, createUser);
  app.post('/users/sessions', userSessionSchema(), schemaValidator, verifyCredentials, signIn);
  app.post(
    '/admin/users',
    isAuthorized,
    isAuthorizedByRoles(roles.ADMIN_USER),
    userSchema(),
    createOrUpdateUserToAdmin
  );
  app.post('/weets', isAuthorized, searchWeet, createWeet);
};
