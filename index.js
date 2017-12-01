'use strict';

var Promise = require('bluebird');
var Validator = require('jsonschema').Validator;

function validate(doc, schema, options) {
  return new Promise(function (resolve, reject) {
    try {
      options = options || {};
      options.throwError = false;

      var obj = doc;

      if (typeof doc === 'string' || doc instanceof String) {
        obj = JSON.parse(doc);
      }

      var v = new Validator();
      v.customFormats.payloadFormat = function (input) {
        return input.cards || input.decisions;
      };

      v.customFormats.decisionFormat = function (input) {
        return input.create || input.delete;
      };

      var result = v.validate(obj, schema, options);

      if (result.valid) {
        resolve(obj);
      } else {
        reject(result.errors);
      }
    } catch (err) {
      reject([{
        property: 'instance',
        message: err.message
        }]);
    }
  });
}

module.exports = {
  Card: function (str, options) {
    return validate(str, require('./lib/card-schema'), options);
  },
  DiscoveryResponse: function (str, options) {
    return validate(str, require('./lib/discovery-response-schema'), options);
  },
  ServiceRequest: function (str, options) {
    return validate(str, require('./lib/service-request-schema.js'), options);
  }
};
