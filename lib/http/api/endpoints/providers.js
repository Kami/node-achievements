var async = require('async');

var providers = require('../../../models/providers');
var httpUtil = require('../../../util/http');
var misc = require('../../../util/misc');


exports.register = function register(req, res) {
  var callback = httpUtil.returnJson.bind(null, res, 200);

  async.waterfall([
    req.checkAndOnSuccess.bind(null, 'providers', null),

    function register(cleaned, callback) {
      var id = misc.getIdFromString(cleaned.name);

      providers.register(id, cleaned, callback);
    },

    function formatRespomse(apiKey, callback) {
      var obj = {
        'msg': 'Provider created',
        'api_key': apiKey
      };

      callback(null, obj);
    }
  ],

  function(err, obj) {
    if (err) {
      httpUtil.returnError(res, 400, err.message);
      return;
    }

    callback(obj);
  });
};
