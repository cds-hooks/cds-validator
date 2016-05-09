'use strict';

var Promise = require('bluebird');
var Validator = require('jsonschema').Validator;
var schema = require('./lib/schema');

module.exports = function(str) {
  return new Promise(function(resolve, reject) {
    try {
      var cards = JSON.parse(str);

      var v = new Validator();
      v.customFormats.payloadFormat = function(input) {
        return input.cards || input.decisions;
      };

      v.customFormats.decisionFormat = function(input) {
        return input.create || input.delete;
      };

      var result = v.validate(cards, schema, { throwError: false });

      if (result.valid) {
        resolve(cards);
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
};
