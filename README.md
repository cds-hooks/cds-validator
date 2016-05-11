# cds-validator

[![NPM](https://nodei.co/npm/cds-validator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/cds-validator/)

[![Circle CI](https://circleci.com/gh/cds-hooks/cds-validator.svg?style=shield)](https://circleci.com/gh/cds-hooks/cds-validator)
[![devDependency Status](https://david-dm.org/cds-hooks/cds-validator.svg)](https://david-dm.org/cds-hooks/cds-validator#info=devDependencies)


A "card validator" to evaluate CDS payloads.

## Usage
The library takes, as input, a string representing the response from a CDS service. It will return a promise that will either `resolve` to a JSON object (the parsed payload) or `reject` to an array of errors indicating what went wrong.

```js
var validate = require('cds-validator').Card;

validate(jsonString).then(function(obj) {
    // do something with the parsed payload
  })
  .catch(function(err) {
    // an array of errors indicating what went wrong
  });
```

## Notes
Thank you to [Josh Mandel](https://github.com/jmandel) and [Kevin Shekleton](https://github.com/kpshek) for the cds-hooks project, a JSON-based mechanism for EMR systems to provide decision support tools from within a clinician's workflow.
