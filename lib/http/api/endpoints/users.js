var async = require('async');
var sprintf = require('sprintf').sprintf;

var users = require('../../../models/users');
var httpUtil = require('../../../util/http');
var misc = require('../../../util/misc');


exports.list = function list(req, res) {
  var callback = httpUtil.serializerResponseCallback.bind(null, res);
  users.getAll(function(err, data) {
    callback(err, misc.objToList(data));
  });
};


exports.get = function list(req, res) {
  var id = req.params.userId,
      callback = httpUtil.serializerResponseCallback.bind(null, res);

  users.getById(id, callback);
};


exports.feed = function list(req, res) {
};


exports.create = function create(req, res) {
  var callback = httpUtil.responseCallback.bind(null, res, 'User created');

  async.waterfall([
    req.checkAndOnSuccess.bind(null, 'users', null),

    function create(cleaned, callback) {
      var id = misc.getIdFromString(cleaned.username);

      cleaned.points = 0;
      users.create(id, cleaned, callback);
    }
  ], callback);
};


exports.remove = function remove(req, res) {
  var id = req.params.userId,
      callback = httpUtil.responseCallback.bind(null, res, 'User deleted');

  users.remove(id, callback);
};
