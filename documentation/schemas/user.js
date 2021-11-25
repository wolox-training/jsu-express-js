module.exports = {
  id: {
    type: 'integer',
    example: 7
  },
  firstName: {
    type: 'string',
    example: 'Test name'
  },
  lastName: {
    type: 'string',
    example: 'Test lasname'
  },
  email: {
    type: 'string',
    example: 'testing@wolox.com.co'
  },
  password: {
    type: 'string',
    example: 'testingPassword123'
  },
  User: {
    type: 'object',
    properties: {
      firstName: {
        $ref: '#/components/schemas/firstName'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
