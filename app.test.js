const request = require('supertest');
const app = require('./app');
const userSerializer = require('./app/serializers/user');
const errors = require('./app/errors');

const errorReseponse = error => ({
  message: error.message,
  internal_code: error.internalCode
});

describe('Test endpoint /users', () => {
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
    const bodyExpected = { ...userTest, id: body.id };
    expect(body).toStrictEqual(userSerializer.createReponseUser(bodyExpected));
  });

  it('Error email beforeCreated POST /users', async () => {
    const responseError = errors.badRequestError('Email already exist!');
    await server.post('/users').send(userTest);
    const { body } = await server
      .post('/users')
      .send(userTest)
      .expect(400);
    expect(body).toStrictEqual(errorReseponse(responseError));
  });

  it('Error wrong password POST /users', async () => {
    const responseError = errors.badRequestError("password doesn't meet the required characteristics");
    const bodyPasswordWrong = { ...userTest, password: '11_d' };
    await server.post('/users').send();
    const { body } = await server
      .post('/users')
      .send(bodyPasswordWrong)
      .expect(400);
    expect(body).toStrictEqual(errorReseponse(responseError));
  });

  it('Error wrong password POST /users', async () => {
    const responseError = errors.databaseError('database error to create user created');
    const bodyPasswordWrong = { email: 'test3@wolox.com.co', password: 'testingJest11' };
    await server.post('/users').send();
    const { body } = await server.post('/users').send(bodyPasswordWrong);
    expect(body).toStrictEqual(errorReseponse(responseError));
  });
});
