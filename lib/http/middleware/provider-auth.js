var log = require('logmagic').local('lib.http.middleware.provider-auth');

var client = require('../../database').getClient();
var httpUtil = require('../../util/http');
var dbUtil = require('../../util/database');


exports = module.exports = function attach() {
  return function addProviderAuthMiddleware(req, res, next) {
    var key = req.headers['x-api-key'];

    dbUtil.checkSetMember('Provider', 'provider_api_keys', key, function(err) {
      if (err) {
        log.info('Invalid API key', {'ip': req.socket.remoteAddress});
        httpUtil.returnError(res, 401, 'Invalid or missing API key');
        return;
      }

      next();
    });
  };
};
