'use strict';

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validator = require('../index').ServiceRequest;

describe('the service request', function() {
  var payload;

  beforeEach(function() {
    payload = {
      hookInstance : 'd1577c69-dfbe-44ad-ba6d-3e05e953b2ea',
      fhirServer : 'http://hooks.smarthealthit.org:9080',
      hook : 'patient-view',
      redirect : 'http://hooks2.smarthealthit.org/service-done.html',
      user : 'Practitioner/example',
      context : [{}],
      patient : '1288992',
      encounter: '1384912',
      prefetch : {
        patientToGreet : {
          response : {
            status : '200 OK'
          },
          resource : {
           resourceType : 'Patient',
           gender : 'male',
           birthDate : '1925-12-23',
           id : '1288992',
           active : true
          }
        }
      }
    };
  });

  it('should not allow unspecified properties', function() {
    return expect(validator('{invalid:[]}')).to.be.rejected;
  });

  it('should return the object when valid', function() {
    return expect(validator(payload)).to.eventually.deep.equal(payload);
  });

  it('should require a hook', function() {
    delete payload.hook;

    return expect(validator(payload)).to.be.rejected;
  });

  it('should require a hook instance', function() {
    delete payload.hookInstance;

    return expect(validator(payload)).to.be.rejected;
  });

  it('should require a fhir server', function() {
    delete payload.fhirServer;

    return expect(validator(payload)).to.be.rejected;
  });

  it('should optionally allow an oauth property');

  it('should require a redirect', function() {
    delete payload.redirect;

    return expect(validator(payload)).to.be.rejected;
  });

  it('should require a user', function() {
    delete payload.user;

    return expect(validator(payload)).to.be.rejected;
  });

  it('should optionally allow a patient', function() {
    delete payload.patient;

    return expect(validator(payload)).to.eventually.deep.equal(payload);
  });

  it('should optionally allow an encounter', function() {
    delete payload.encounter;

    return expect(validator(payload)).to.eventually.deep.equal(payload);
  });

  it('should only allow objects in the context array', function() {
    payload.context = ['string'];

    return expect(validator(payload)).to.be.rejected;
  });

  it('should optionally contain a prefetch object', function() {
    delete payload.prefetch;

    return expect(validator(payload)).to.eventually.deep.equal(payload);
  });

  describe('prefetch items', function() {
    it('should have a response object', function() {
      delete payload.prefetch.patientToGreet.response;

      return expect(validator(payload)).to.be.rejected;
    });

    describe('response object', function() {
      it('should not allow unspecified properties', function() {
        payload.prefetch.patientToGreet.response.invalid = 'invalid';

        return expect(validator(payload)).to.be.rejected;
      });

      it('should require a status property', function() {
        delete payload.prefetch.patientToGreet.response.status;

        return expect(validator(payload)).to.be.rejected;
      });
    });

    it('should have a resource object', function() {
      delete payload.prefetch.patientToGreet.resource;

      return expect(validator(payload)).to.be.rejected;
    });
  });
});
