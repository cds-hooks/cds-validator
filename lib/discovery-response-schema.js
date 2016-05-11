module.exports = {
  id: '/cds-response-payload',
  type: 'object',
  additionalProperties: false,
  properties: {
    services: {
      type: 'array',
      required: true,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          hook: {
            type: 'string',
            required: true
          },
          name: {
            type: 'string',
            required: true
          },
          description: {
            type: 'string',
            required: true
          },
          id: {
            type: 'string',
            required: true
          },
          prefetch: {
            type: 'object',
            additionalProperties: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
