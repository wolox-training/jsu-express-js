const userService = require('./user');
const { createReponseUser } = require('../serializers/user');
const errors = require('../errors');
const roles = require('../constants/roles');

describe('User service', () => {
  const userTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };

  test('Success service save user', async () => {
    const userSaved = await userService.createUser(userTest);
    const userCreated = createReponseUser({ ...userSaved.dataValues, role: roles.REGULAR_USER });
    const response = createReponseUser({ ...userTest, id: userSaved.id, role: roles.REGULAR_USER });
    expect(userCreated).toStrictEqual(response);
  });

  test('Error database save user', async () => {
    try {
      await userService.createUser();
    } catch (error) {
      const errorCustom = errors.databaseError('database error to create user created');
      expect(error).toStrictEqual(errorCustom);
    }
  });

  test('Success service user find by email', async () => {
    await userService.createUser(userTest);
    const userSaved = await userService.findUserByEmail(userTest.email);
    expect(userSaved).not.toBeNull();
  });

  test('Error service user find', async () => {
    const userSaved = await userService.findUserByEmail(userTest.email);
    expect(userSaved).toBeNull();
  });
});
