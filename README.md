# cds-validator

[![NPM](https://nodei.co/npm/cds-validator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/cds-validator/)

[![Build Status](https://travis-ci.org/cds-hooks/cds-validator.svg?branch=master)](https://travis-ci.org/cds-hooks/cds-validator)
[![devDependency Status](https://david-dm.org/cds-hooks/cds-validator.svg)](https://david-dm.org/cds-hooks/cds-validator#info=devDependencies)


A "card validator" to evaluate CDS payloads.

## Usage

The library takes, as input, a string representing the response from a CDS service and optional options to feed the [jsonschema](https://www.npmjs.com/package/jsonschema). It will return a promise that will either `resolve` to a JSON object (the parsed payload) or `reject` to an array of errors indicating what went wrong.

The module exports validators for [CDS Service Responses (Cards)](http://cds-hooks.org/specification/1.0/#cds-service-response) and [CDS Discovery Responses](http://cds-hooks.org/specification/1.0/#response).


```js
// pick your poison
var validate = require('cds-validator').Card;
var validate = require('cds-validator').DiscoveryResponse;
var validate = require('cds-validator').ServiceRequest;

var options = {
  propertyName: 'payload'
}
validate(jsonString, options).then(function(obj) {
    // do something with the parsed payload
  })
  .catch(function(err) {
    // an array of errors indicating what went wrong,
    // where failing fields are called 'payload.<field name>' (default is 'instance.<field name>')
  });
```

## Notes

Thank you to [Josh Mandel](https://github.com/jmandel) and [Kevin Shekleton](https://github.com/kpshek) for the cds-hooks project, a JSON-based mechanism for EMR systems to provide decision support tools from within a clinician's workflow.
