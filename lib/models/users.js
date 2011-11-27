var async = require('async');
var sprintf = require('sprintf').sprintf;

var client = require('../database').getClient();
var misc = require('../util/misc');
var dbUtil = require('../util/database');


exports.USER_KEYS = ['username', 'email', 'points'];


exports.getUserHashKey = function(id) {
  return sprintf('users:%s', id);
};


exports.getUserAliasesKey = function(id) {
  return sprintf('users:%s:aliases', id);
};


/**
 * Get all the users.
 *
 * @param {Function} callback A callback called with (err, {Object}users).
 */
exports.getAll = function(callback) {
  async.waterfall([
    client.smembers.bind(client, 'users'),

    function getUsers(userIds, callback) {
      var users = {};

      async.forEach(userIds, function(id, callback) {
        exports.getById(id, function(err, obj) {
          if (!err) {
            users[id] = obj;
          }

          callback();
        });
      },

      function(err) {
        callback(err, users);
      });
    }
  ], callback);
};


/**
 * Retrieve a user by the id.
 *
 * @param {String} id User id.
 * @param {Function} callback Callback called with (err, user).
 */
exports.getById = function(id, callback) {
  var hashKey = exports.getUserHashKey(id),
      aliasesKey = exports.getUserAliasesKey(id);

  async.parallel([
    dbUtil.checkSetMember.bind(client, 'User', 'users', id),
    client.hgetall.bind(client, hashKey),
    client.smembers.bind(client, aliasesKey)
  ],

  function(err, results) {
    var obj, aliases;

    if (err) {
      callback(err);
      return;
    }

    obj = results[1];
    aliases = results[2];
    obj.aliases = aliases;

    callback(null, obj);
  });
};


/**
 * Create a new user.
 *
 * @param {String} id User id.
 * @param {Object} obj User data.
 * @param {Function} callback Callback called with (err).
 */
exports.create = function(id, obj, callback) {
  var hashKey = exports.getUserHashKey(id),
      aliasesKey = exports.getUserAliasesKey(id);

  async.waterfall([
    dbUtil.checkSetNotMember.bind(client, 'User', 'users', id),

    function create(callback) {
      var multi = client.multi(),
          aliases = obj.aliases || [];

      delete obj.aliases;

      multi.sadd('users', id);
      multi.sadd(aliasesKey, aliases);
      multi.hmset(hashKey, obj);
      multi.exec(callback);
    }
  ], callback);
};


/**
 * Delete a user.
 *
 * @param {String} id User id.
 * @param {Function} callback Callback called with (err).
 */
exports.remove = function remove(id, callback) {
  var hashKey = exports.getUserHashKey(id),
      aliasesKey = exports.getUserAliasesKey(id);

  async.waterfall([
    dbUtil.checkSetMember.bind(client, 'User', 'users', id),

    // Get aliases
    client.smembers.bind(client, aliasesKey),

    function remove(aliases, callback) {
      var multi = client.multi();

      multi.srem('users', id);
      multi.srem(aliasesKey, aliases);
      multi.hdel(hashKey, exports.USER_KEYS);
      multi.exec(callback);
    }
  ], callback);
};
