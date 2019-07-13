// Person
const schema = {
  type: 'object',
  properties: {
    address: {
      type: 'string'
    },
    id: {
      type: 'number'
    },
    email: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    confirmPassword: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    isAdmin: {
      type: 'boolean'
    }
  }
};

module.exports = {
  schema
};
