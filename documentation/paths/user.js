module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'New user was created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              },
              example: {
                id: 1,
                firstName: 'Test name',
                lastName: 'Testing lastname',
                email: 'testing@wolox.com.com'
              }
            }
          }
        },
        400: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              examples: {
                'User email exist': {
                  value: {
                    message: 'Email already exist!',
                    internal_code: 'bad_request_error'
                  }
                },
                'User email wrong domain': {
                  value: {
                    message: 'Email Domain needs to be wolox.com.co',
                    internal_code: 'bad_request_error'
                  }
                },
                'User password wrong': {
                  value: {
                    message: "password doesn't meet the required characteristics",
                    internal_code: 'bad_request_error'
                  }
                }
              }
            }
          }
        },
        503: {
          description: 'Database error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                'User email exist': {
                  message: 'database error to create user created',
                  internal_code: 'database_error'
                }
              }
            }
          }
        }
      }
    }
  }
};
