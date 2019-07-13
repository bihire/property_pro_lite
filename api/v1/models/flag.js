// Person
const Flagschema = {
  type: 'object',
  properties: {
    property_id: {
      type: 'integer'
    },
    id: {
      type: 'integer'
    },
    created_on: {
      type: 'string',
      format: 'date-time'
    },
    reason: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  }
};

module.exports = {
  Flagschema
};
