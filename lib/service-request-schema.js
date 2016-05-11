module.exports = {
  id: '/cds-response-payload',
  type: 'object',
  additionalProperties: false,
  properties: {
    hook: {
      type: 'string',
      required: true
    },
    hookInstance: {
      type: 'string',
      required: true
    },
    fhirServer: {
      type: 'string',
      required: true
    },
    redirect: {
      type: 'string',
      required: true
    },
    user: {
      type: 'string',
      required: true
    },
    patient: {
      type: 'string'
    },
    encounter: {
      type: 'string'
    },
    context: {
      type: 'array',
      items: {
        type: 'object'
      }
    },
    prefetch: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        additionalProperties: false,
        properties: {
          response: {
            type: 'object',
            required: true,
            additionalProperties: false,
            properties: {
              status: {
                type: 'string',
                required: true
              }
            }
          },
          resource: {
            type: 'object',
            required: true
          }
        }
      }
    }
  }
};
