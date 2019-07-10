// Person
const Propertyschema = {
  type: 'object',
  properties: {
    owner: {
      type: 'integer'
    },
    id: {
      type: 'integer'
    },
    status: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    state: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    created_on: {
      type: 'string',
      format: 'date-time'
    },
    image_url: {
      type: 'string',
      format: 'uri'
    },
    ownerEmail: {
      type: 'string'
    },
    ownerPhoneNumber: {
      type: 'string'
    }
  }
};

module.exports = {
  Propertyschema
};
