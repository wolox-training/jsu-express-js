const userService = require('./user');
const { createReponseUser } = require('../serializers/user');
const errors = require('../errors');

describe('User service', () => {
  const userTest = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@wolox.com.co',
    password: 'testingJest11'
  };

  test('Success service save user', async () => {
    const userSaved = await userService.createUser(userTest);
    const userCreated = createReponseUser(userSaved);
    expect(userCreated).toStrictEqual(createReponseUser({ ...userTest, id: userSaved.id }));
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
