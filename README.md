# cds-validator

[![NPM](https://nodei.co/npm/cds-validator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/cds-validator/)

[![Circle CI](https://circleci.com/gh/cds-hooks/cds-validator.svg?style=shield)](https://circleci.com/gh/cds-hooks/cds-validator)
[![devDependency Status](https://david-dm.org/cds-hooks/cds-validator.svg)](https://david-dm.org/cds-hooks/cds-validator#info=devDependencies)


A "card validator" to evaluate CDS payloads.

## Usage
The library takes, as input, a string representing the response from a CDS service. It will return a promise that will either `resolve` to a JSON object (the parsed payload) or `reject` to an array of errors indicating what went wrong.

```js
var validate = require('cds-validator');

validate(jsonString).then(function(obj) {
    // do something with the parsed payload
  })
  .catch(function(err) {
    // an array of errors indicating what went wrong
  });
```

## Notes
Thank you to [Josh Mandel](https://github.com/jmandel) and [Kevin Shekleton](https://github.com/kpshek) for the cds-hooks project, a JSON-based mechanism for EMR systems to provide decision support tools from within a clinician's workflow.

## License

(MIT License)
Copyright (c) 2016 [Matt Berther](https://matt.berther.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
