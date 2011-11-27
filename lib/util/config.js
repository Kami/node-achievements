var fs = require('fs');

var log = require('logmagic').local('lib.util.config');

exports.config = {};

exports.loadConfig = function loadConfig(configPath) {
  var content;

  try {
    content = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  catch (err) {
    log.error('Failed to load config', {'err': err});
  }

  exports.config = content;
  return exports.config;
};
