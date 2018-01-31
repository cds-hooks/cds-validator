module.exports = {
  id: '/cds-request-payload',
  type: 'object',
  additionalProperties: false,
  properties: {
    hook: {
      "anyOf": [
        { type: 'string' },
        { type: 'uri' }
      ],
      required: true
    },
    hookInstance: {
      type: 'string',
      required: true
    },
    fhirServer: {
      type: 'string',
      format: 'uri'
    },
    user: {
      type: 'string',
      required: true
    },
    fhirAuthorization: {
      type: 'object',
      additionalProperties: false,
      properties: {
        access_token: {
          type: 'string',
          required: true
        },
        token_type: {
          type: 'string',
          required: true,
          enum: ['Bearer']
        },
        expires_in: {
          type: 'integer',
          required: true
        },
        scope: {
          type: 'string',
          required: true
        },
        subject: {
          type: 'string',
          required: true
        }
      }
    },
    context: {
      type: 'object'
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
