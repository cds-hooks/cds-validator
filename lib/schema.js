module.exports = {
  id: '/cds-response-payload',
  type: 'object',
  additionalProperties: false,
  format: 'payloadFormat',
  properties: {
    decisions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        format: 'decisionFormat',
        properties: {
          create: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          delete: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    },
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
              url: { type: 'string' }
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
                create: {
                  type: 'string'
                },
                delete: {
                  type: 'string'
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
                  required: true
                }
              }
            }
          }
        }
      }
    }
  }
};
