var express = require('express');
var log = require('logmagic').local('lib.http.api_server');

var register = require('./urls').register;

exports.run = function run(port, host) {
  var app = express.createServer();

  register(app);
  app.listen(port, host, function() {
    log.info('API server listening on ' + host + ':' + port);
  });
};
