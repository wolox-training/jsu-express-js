const weetService = require('./weet');
const userService = require('./user');

describe('Weet service', () => {
  it('Success service save weet', async () => {
    const userTest = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@wolox.com.co',
      password: 'testingJest11'
    };
    const { dataValues: userSaved } = await userService.createUser(userTest);
    const { joke: content } = await weetService.getGeekPhrase();
    const weetSaved = await weetService.saveWeet({
      userId: userSaved.id,
      content
    });
    expect(weetSaved).toBeTruthy();
  });
});
