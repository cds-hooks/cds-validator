'use strict';

var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validator = require('../index').ServiceRequest;

/**
 * Deletes a potentially nested field with the given name from the given object
 */
function deleteField(obj, fieldName) {
    var fieldNames = fieldName.split('.');

    var field = obj;
    for (var i = 0; i < fieldNames.length - 1; i++) {
        field = field[fieldNames[i]];
    }
    delete field[fieldNames[fieldNames.length - 1]];
}

/**
 * Removes the specified field (potentially nested), runs the validator on the updated payload, and returns expected rejection
 */
function validateRequiredField(payload, fieldName) {
    deleteField(payload, fieldName);
    return expect(validator(payload)).to.be.rejected;
}

/**
 * Removes the specified field (potentially nested), runs the validator on the updated payload, and returns expected success
 */
function validateOptionalField(payload, fieldName) {
    deleteField(payload, fieldName);
    expect(validator(payload)).to.eventually.deep.equal(payload);
}

describe('the service request', function () {
    var payload;

    beforeEach(function () {
        payload = {
            hookInstance: 'd1577c69-dfbe-44ad-ba6d-3e05e953b2ea',
            fhirServer: 'http://hooks.smarthealthit.org:9080',
            hook: 'https://cds-hooks.org/hooks/1.0/patient-view',
            user: 'Practitioner/example',
            context: {},
            fhirAuthorization: {
                access_token: 'some-opaque-fhir-access-token',
                token_type: 'Bearer',
                expires_in: 300,
                scope: 'patient/Patient.read patient/Observation.read',
                subject: 'OAuth2 client identifier'
            },
            prefetch: {
                patientToGreet: {
                    response: {
                        status: '200 OK'
                    },
                    resource: {
                        resourceType: 'Patient',
                        gender: 'male',
                        birthDate: '1925-12-23',
                        id: '1288992',
                        active: true
                    }
                }
            }
        };
    });

    it('should not allow unspecified properties', function () {
        return expect(validator('{invalid:[]}')).to.be.rejected;
    });

    it('should return the object when valid', function () {
        return expect(validator(payload)).to.eventually.deep.equal(payload);
    });

    it('should require a hook', function () {
        return validateRequiredField(payload, 'hook');
    });

    it('should allow a hook to be a regular string', function () {
        payload.hook = 'patient-view';
        return expect(validator(payload)).to.be.valid;
    });

    it('should require a hook instance', function () {
        return validateRequiredField(payload, 'hookInstance');
    });

    it('should optionally allow a fhirAuthorization', function () {
        return validateOptionalField(payload, 'fhirAuthorization');
    });

    describe('fhirAuthorization items', function () {
        it('should require a fhirAuthorization access_token', function () {
            return validateRequiredField(payload, 'fhirAuthorization.access_token');
        });

        it('should require a fhirAuthorization token_type', function () {
            return validateRequiredField(payload, 'fhirAuthorization.token_type');
        });

        it('should require a fhirAuthorization token_type have value Bearer', function () {
            payload.fhirAuthorization.token_type = 'Invalid';

            return expect(validator(payload)).to.be.rejected;
        });

        it('should require a fhirAuthorization expires_in', function () {
            return validateRequiredField(payload, 'fhirAuthorization.expires_in');
        });

        it('should require a fhirAuthorization scope', function () {
            return validateRequiredField(payload, 'fhirAuthorization.scope');
        });
    });

    it('should require a user', function () {
        return validateRequiredField(payload, 'user');
    });

    it('should optionally allow a patient', function () {
        return validateOptionalField(payload, 'patient');
    });

    it('should optionally allow an encounter', function () {
        return validateOptionalField(payload, 'encounter');
    });

    it('should only allow context object', function () {
        payload.context = [];

        return expect(validator(payload)).to.be.rejected;
    });

    it('should optionally contain a prefetch object', function () {
        return validateOptionalField(payload, 'prefetch');
    });

    describe('prefetch items', function () {
        it('should have a response object', function () {
            return validateRequiredField(payload, 'prefetch.patientToGreet.response');
        });

        describe('response object', function () {
            it('should not allow unspecified properties', function () {
                payload.prefetch.patientToGreet.response.invalid = 'invalid';

                return expect(validator(payload)).to.be.rejected;
            });

            it('should require a status property', function () {
                return validateRequiredField(payload, 'prefetch.patientToGreet.response.status');
            });
        });

        it('should have a resource object', function () {
            return validateRequiredField(payload, 'prefetch.patientToGreet.resource');
        });
    });
});
