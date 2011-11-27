var sprintf = require('sprintf').sprintf;

var client = require('../database').getClient();


/**
 * Verify that a set contains a provided member.
 *
 * @param {Function} callback Callback called with (err);
 */
exports.checkSetMember = function checkSetMember(model, key, id, callback) {
  var errMsg = sprintf('%s with id %s does not exist', model, id);

  client.sismember(key, id, function(err, isMember) {
    if (!err && !isMember) {
      err = new Error(errMsg);
    }

    callback(err);
  });
};

/**
 * Verify that a set doesn't contain a provided member.
 *
 * @param {Function} callback Callback called with (err);
 */
exports.checkSetNotMember = function checkSetNotMember(model, key, id, callback) {
  var errMsg = sprintf('%s with id %s already exists', model, id);

  client.sismember(key, id, function(err, isMember) {
    if (!err && isMember) {
      err = new Error(errMsg);
    }

    callback(err);
  });
};
