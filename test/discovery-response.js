'use strict';

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validator = require('../index').DiscoveryResponse;

describe('the discovery response', function() {
  var payload;

  beforeEach(function() {
    payload = {
      services: [{
        hook: 'patient-view',
        name: 'Static CDS Service Example',
        description: 'An example of a CDS service that returns a static set of cards',
        id: 'static-patient-greeter',
        prefetch: {
          patientToGreet: 'Patient/{{Patient.id}}'
        }
      }]
    };
  });

  it('should not allow unspecified properties', function() {
    return expect(validator('{invalid:[]}')).to.be.rejected;
  });

  it('should return the object when valid', function() {
    return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
  });

  it('should require a services element', function() {
    delete payload.services;

    return expect(validator(JSON.stringify(payload))).to.be.rejected;
  });

  it('should not allow unspecified properties', function() {
    payload.invalid_field = 'this should fail';

    return expect(validator(JSON.stringify(payload))).to.be.rejected;
  });

  describe('services element', function() {
    it('should be an array', function() {
      payload.services = 'this should fail';

      return expect(validator(JSON.stringify(payload))).to.be.rejected;
    });

    describe('service', function() {
      it('should require a hook', function() {
        delete payload.services[0].hook;

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should require a name', function() {
        delete payload.services[0].name;

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should require a description', function() {
        delete payload.services[0].description;

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should require an id', function() {
        delete payload.services[0].id;

        return expect(validator(JSON.stringify(payload))).to.be.rejected;
      });

      it('should optionally contain a prefetch object', function() {
        delete payload.services[0].prefetch;

        return expect(validator(JSON.stringify(payload))).to.eventually.deep.equal(payload);
      });

      describe('prefetch', function() {
        it('should only allow string properties', function() {
          payload.services[0].prefetch.bool_prop = false;

          return expect(validator(JSON.stringify(payload))).to.be.rejected;
        });
      });
    });
  });
});
