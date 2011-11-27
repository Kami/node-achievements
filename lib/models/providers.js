var async = require('async');
var sprintf = require('sprintf').sprintf;

var client = require('../database').getClient();
var misc = require('../util/misc');
var dbUtil = require('../util/database');

exports.getProviderHashKey = function(id) {
  return sprintf('providers:%s', id);
};


/**
 * Register a new provider and generate an API key for it.
 *
 * @param {Function} callback Callback called with (err, apiKey).
 */
exports.register = function register(id, obj, callback) {
  var apiKey = misc.randstr(40),
      hashKey = exports.getProviderHashKey(id);

  async.waterfall([
    dbUtil.checkSetNotMember.bind(client, 'Provider', 'providers', id),

    function create(callback) {
      var multi = client.multi();

      obj.api_key = apiKey;

      multi.sadd('providers', id);
      multi.sadd('provider_api_keys', apiKey);
      multi.hmset(hashKey, obj);
      multi.exec(callback);
    }
  ],

  function(err) {
    callback(err, apiKey);
  });
};
