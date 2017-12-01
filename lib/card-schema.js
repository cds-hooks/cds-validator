module.exports = {
  id: '/cds-response-payload',
  type: 'object',
  additionalProperties: false,
  format: 'payloadFormat',
  properties: {
    cards: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          summary: {
            type: 'string',
            required: true
          },
          detail: {
            type: 'string',
            required: true
          },
          indicator: {
            enum: ['success', 'info', 'warning', 'hard-stop'],
            type: 'string',
            required: true
          },
          source: {
            type: 'object',
            required: true,
            additionalProperties: false,
            properties: {
              label: {
                type: 'string',
                required: true
              },
              url: {
                type: 'string',
                format: 'uri'
              },
              icon: {
                type: 'string',
                format: 'uri'
              }
            }
          },
          suggestions: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                label: {
                  type: 'string',
                  required: true
                },
                uuid: {
                  type: 'string',
                  required: true
                },
                actions: {
                  type: 'array',
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                      type: {
                        type: 'string',
                        required: true,
                        enum: ['create', 'update', 'delete']
                      },
                      description: {
                        type: 'string'
                      },
                      resource: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            }
          },
          links: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                label: {
                  type: 'string',
                  required: true
                },
                url: {
                  type: 'string',
                  required: true,
                  format: 'uri'
                },
                type: {
                  type: 'string',
                  enum: ['absolute', 'smart']
                },
                appContext: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
};
