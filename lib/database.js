var redis = require('redis');

var config = require('./util/config').config;


exports.getClient = function getClient() {
  return redis.createClient(config.database.port, config.database.host);
};
