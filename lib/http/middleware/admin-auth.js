var log = require('logmagic').local('lib.http.middleware.admin-auth');

var httpUtil = require('../../util/http');
var config = require('../../util/config').config;


exports = module.exports = function attach() {
  return function addAdminAuthMiddleware(req, res, next) {
    var key = req.headers['x-api-key'];

    if (!key || key !== config.api_keys.admin) {
      log.info('Invalid API key', {'ip': req.socket.remoteAddress});
      httpUtil.returnError(res, 401, 'Invalid or missing API key');
      return;
    }

    next();
  };
};
