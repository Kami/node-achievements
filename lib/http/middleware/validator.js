var Valve = require('swiz').Valve;

var validity = require('../api/defs').validity;
var httpUtil = require('../../util/http');


function check(req, res, type, full, finalValidator, callback) {
  var validator, v;

  if (!req.body) {
    callback(new Error('Empty Request Body'));
    return;
  }

  v = new Valve(validity[type]);

  if (finalValidator) {
    v.addFinalValidator(finalValidator);
  }

  v.baton = { req: req };
  validator = full ? v.check : v.checkPartial;

  validator.call(v, req.body, function(err, cleaned) {
    if (err) {
      callback(err);
      return;
    }

    callback(null, cleaned);
  });
}


function checkAndOnSuccess(req, res, isPartial) {
  return function(type, finalValidator, callback) {
    check(req, res, type, isPartial, finalValidator, function(err, cleaned) {
      if (err) {
        httpUtil.returnError(res, 400, err);
        return;
      }

      callback(null, cleaned);
    });
  };
}


exports = module.exports = function attach(object_name) {
  return function addValidatorMiddleware(req, res, next) {
    req.check = function(type, callback) {
      check(req, res, type, true, callback);
    };

    req.checkPartial = function(type, callback) {
      check(req, res, type, false, callback);
    };

    req.checkAndOnSuccess = checkAndOnSuccess(req, res, true);
    req.checkAndOnPartialSuccess = checkAndOnSuccess(req, res, false);

    next();
  };
};
