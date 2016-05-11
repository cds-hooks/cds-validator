'use strict';

var Promise = require('bluebird');
var Validator = require('jsonschema').Validator;

function validate(str, schema) {
  return new Promise(function(resolve, reject) {
    try {
      var obj = JSON.parse(str);

      var v = new Validator();
      v.customFormats.payloadFormat = function(input) {
        return input.cards || input.decisions;
      };

      v.customFormats.decisionFormat = function(input) {
        return input.create || input.delete;
      };

      var result = v.validate(obj, schema, { throwError: false });

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
  Card: function(str) {
    return validate(str, require('./lib/card-schema'));
  }
};
