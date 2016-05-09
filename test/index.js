'use strict';

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validator = require('../index');

describe('the cds payload', function() {
  var payload;

  beforeEach(function() {
    payload = {
      cards: [{
        summary: '<140-character summary message for display to the user',
        detail: 'optional detailed information to display, represented in Markdown',
        indicator: 'success',
        source: {
          label: 'source of the information on the card'
        }
      }],
      decisions: [{
        create: ['resource1', 'resource2'],
        delete: ['resource3', 'resource4']
      }]
    };
  });

  it('should not allow unspecified properties', function() {
    return expect(validator('{services:[]}')).to.be.rejected;
  });

  it('should return the object when valid', function() {
    return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
  });

  it('should be valid without any cards', function() {
    delete payload.cards;

    return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
  });

  it('should be valid without any decisions', function() {
    delete payload.decisions;

    return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
  });

  it('should require either a cards or decisions element', function() {
    delete payload.cards;
    delete payload.decisions;

    return expect(validator(JSON.stringify(payload))).to.be.rejected;
  });

  it('should not allow unspecified properties', function() {
    payload.invalid_field = 'this should fail';

    return expect(validator(JSON.stringify(payload))).to.be.rejected;
  });

  describe('decisions element', function() {
    it('should be an array', function() {
      payload.decisions = 'this should fail';

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    describe('decision', function() {
      it('should require either create or delete array', function() {
        payload.decisions = [{}];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should allow an array of create strings', function() {
        payload.decisions = [{
          create: ['resource1', 'resource2']
        }];

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should allow an array of delete string', function() {
        payload.decisions = [{
          delete: ['resource1', 'resource2']
        }];

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should not allow objects in the crete array', function() {
        payload.decisions = [{
          create: [{key: 'resource1'}]
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should not allow objects in the delete array', function() {
        payload.decisions = [{
          delete: [{key: 'resource1'}]
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });
    });
  });

  describe('cards element', function() {
    it('should be an array', function() {
      payload.cards = 'this should fail';

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    it('should require a summary', function() {
      delete payload.cards[0].summary;

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    it('should require detail information', function() {
      delete payload.cards[0].detail;

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    it('should require an indicator', function() {
      delete payload.cards[0].indicator;

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    describe('indicator', function() {
      it('should allow indicator to be success', function() {
        payload.cards[0].indicator = 'success';

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should allow indicator to be info', function() {
        payload.cards[0].indicator = 'info';

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should allow indicator to be warning', function() {
        payload.cards[0].indicator = 'warning';

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should allow indicator to be hard-stop', function() {
        payload.cards[0].indicator = 'hard-stop';

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      it('should not allow indicator to be invalid', function() {
        payload.cards[0].indicator = 'invalid';

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });
    });

    it('should require a source', function() {
      delete payload.cards[0].source;

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    describe('source', function() {
      it('should require a label', function() {
        delete payload.cards[0].source.label;

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should optionally allow a url', function() {
        payload.cards[0].source.url = 'https://github.com/cds-hooks/cds-validator';

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });
    });

    it('should allow an optional list of suggestions', function() {
      payload.cards[0].suggestions = [{
        label: 'Suggestion Label',
        uuid: '94b2b626-1584-11e6-a148-3e1d05defe78',
        create: 'MedicationOrder/b49f1c4a',
        delete: 'Order/3e1d05defe78'
      }];

      return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
    });

    describe('suggestions', function() {
      it('should require a label', function() {
        payload.cards[0].suggestions = [{
          uuid: '94b2b626-1584-11e6-a148-3e1d05defe78'
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should require a uuid', function() {
        payload.cards[0].suggestions = [{
          label: 'Suggestion Label'
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });
    });

    it('should allow an optional list of links', function() {
      payload.cards[0].links = [{
        label: 'GitHub CDS Validator',
        url: 'https://github.com/cds-hooks/cds-validator'
      }];

      return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
    });

    describe('links', function() {
      it('should require a label', function() {
        payload.cards[0].links = [{
          url: 'https://github.com/cds-hooks/cds-validator'
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should require a url', function() {
        payload.cards[0].links = [{
          label: 'GitHub CDS Validator'
        }];

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });
    });
  });
});
