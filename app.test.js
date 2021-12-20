const request = require('supertest');
const app = require('./app');
const userSerializer = require('./app/serializers/user');
const errors = require('./app/errors');
const roles = require('./app/constants/roles');
const userService = require('./app/services/user');
const encrypt = require('./app/helpers/encrypt');

const errorReseponse = error => ({
  message: error.message,
  internal_code: error.internalCode
});

describe('Test endpoint POST /users', () => {
  const userTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };
  const server = request(app);
  it('Success POST /users', async () => {
    const { body } = await server
      .post('/users')
      .send(userTest)
      .expect(201);
    const bodyExpected = { ...userTest, id: body.id, role: roles.REGULAR_USER };
    expect(body).toMatchObject(userSerializer.createReponseUser(bodyExpected));
  });

  it('Error email beforeCreated POST /users', async () => {
    const responseError = errors.badRequestError('Email already exist!');
    await server.post('/users').send(userTest);
    const { body } = await server
      .post('/users')
      .send(userTest)
      .expect(400);
    expect(body).toMatchObject(errorReseponse(responseError));
  });

  it('Error wrong email POST /users', async () => {
    const responseError = errors.badRequestError({
      email: 'Email Domain needs to be @wolox.com.(co | ar)'
    });
    const payload = { ...userTest, email: 'email@gmail.com' };
    const { body } = await server
      .post('/users')
      .send(payload)
      .expect(400);
    expect(body).toMatchObject(errorReseponse(responseError));
  });

  it('Error wrong password POST /users', async () => {
    const responseError = errors.badRequestError({
      password: "password doesn't meet the required characteristics, minimun lenght 8 and alphanumeric"
    });
    const bodyPasswordWrong = { ...userTest, password: '11_d' };
    await server.post('/users').send();
    const { body } = await server
      .post('/users')
      .send(bodyPasswordWrong)
      .expect(400);
    expect(body).toMatchObject(errorReseponse(responseError));
  });

  it('Without firstName and lastName keys POST /users', async () => {
    const responseError = errors.badRequestError({
      firstName: 'First name should exist',
      lastName: 'Last name should exist'
    });
    const bodyPasswordWrong = { email: 'test3@wolox.com.co', password: 'testingJest11' };
    await server.post('/users').send();
    const { body } = await server.post('/users').send(bodyPasswordWrong);
    expect(body).toMatchObject(errorReseponse(responseError));
  });
});

describe('Test endpoint POST /user/session', () => {
  const userTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };
  const server = request(app);
  it('Success POST /users/session', async () => {
    await server.post('/users').send(userTest);
    const { body } = await server
      .post('/users/sessions')
      .send({
        email: userTest.email,
        password: userTest.password
      })
      .expect(200);
    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('message');
  });

  it('Error password POST /users/session', async () => {
    await server.post('/users').send(userTest);
    const { body } = await server
      .post('/users/sessions')
      .send({
        email: userTest.email,
        password: `${userTest.password}1`
      })
      .expect(400);

    expect(body).toMatchObject({
      message: 'Email or password incorrect',
      internal_code: 'bad_request_error'
    });
  });

  it('Error email POST /users/session', async () => {
    await server.post('/users').send(userTest);
    const { body } = await server
      .post('/users/sessions')
      .send({
        email: `${userTest.email}.es`,
        password: userTest.password
      })
      .expect(400);

    expect(body).toMatchObject({
      message: 'Email or password incorrect',
      internal_code: 'bad_request_error'
    });
  });
});

describe('Test endpoint GET /users', () => {
  const userTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };
  const server = request(app);

  beforeEach(async () => {
    const users = new Array(20).fill(userTest).map((user, index) => ({
      ...user,
      email: `test${index || ''}@wolox.com.co`
    }));
    const allCreations = users.map(user => server.post('/users').send(user));
    await Promise.allSettled(allCreations);
  });

  it('Success GET /users', async () => {
    const { body: responseSession } = await server.post('/users/sessions').send(userTest);
    const { token } = responseSession;
    const { body } = await server
      .get('/users')
      .query({ limit: 5, offset: 0 })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(body).toHaveProperty('users');
    expect(body.users).toBeInstanceOf(Array);
    expect(body.users.length).toEqual(5);
    expect(body).toHaveProperty('total');
    expect(body.count).not.toBeNaN();
  });

  it('Invalid Token GET /users', async () => {
    const { body: responseSession } = await server.post('/users/sessions').send(userTest);
    const { token } = responseSession;
    const { body } = await server
      .get('/users')
      .query({ limit: 0, offset: 5 })
      .set('Authorization', `Bearer ${token}_`)
      .expect(403);
    expect(body).toMatchObject(errorReseponse(errors.tokenError('Invalid Token')));
  });

  it('Invalid Params /users', async () => {
    const { body: responseSession } = await server.post('/users/sessions').send(userTest);
    const { token } = responseSession;
    const { body } = await server
      .get('/users')
      .query({ limit: NaN, offset: 'a' })
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
    expect(body).toMatchObject(
      errorReseponse(
        errors.badRequestError({
          offset: 'offset is wrong',
          limit: 'limit is wrong'
        })
      )
    );
  });
});

describe('Test endpoint POST /admin/users', () => {
  const userAdminTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };
  const userAdminSession = {
    email: process.env.USER_ADMIN_EMAIL,
    password: process.env.USER_ADMIN_PASSWORD
  };
  const server = request(app);

  let token = '';

  beforeEach(async () => {
    await userService.createUser({
      ...userAdminSession,
      password: encrypt.toEncrypt(userAdminSession.password),
      firstName: 'Admin',
      lastName: 'Admin',
      role: roles.ADMIN_USER
    });
  });

  beforeEach(async () => {
    const { body: responseSession } = await server.post('/users/sessions').send(userAdminSession);
    const { token: tokenSession } = responseSession;
    token = tokenSession;
  });

  it('Success POST /admin/users', async () => {
    await server
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send(userAdminTest)
      .expect(200);
  });

  it('Failure POST /admin/users', async () => {
    const { body } = await server
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}_`)
      .expect(403);
    expect(body).toMatchObject(errorReseponse(errors.tokenError('Invalid Token')));
  });

  it('Update User POST /admin/users', async () => {
    const { body: userCreated } = await server
      .post('/users')
      .send(userAdminTest)
      .expect(201);
    const bodyExpected = { ...userAdminTest, id: userCreated.id, role: roles.REGULAR_USER };
    delete bodyExpected.password;
    expect(userCreated).toMatchObject(bodyExpected);
    const { body: userUpdated } = await server
      .post('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .send(userAdminTest)
      .expect(200);
    expect(userUpdated).toMatchObject({ ...bodyExpected, role: roles.ADMIN_USER });
  });
});
