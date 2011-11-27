var express = require('express');

var handlers = require('./endpoints');
var adminAuthMiddleware = require('./../middleware/admin-auth');
var providerAuthMiddleware = require('./../middleware/provider-auth');
var validatorMiddleware = require('./../middleware/validator');

exports.urls = function url() {
  var app = express.createServer();

  // Middleware
  app.use(express.bodyParser());
  app.use(validatorMiddleware());

  // Global feed
  app.get('/feed', handlers.feed.list);

  // Leaderboard
  app.get('/leaderboard', handlers.leaderboard.list);

  // Achievements
  app.get('/achievements', handlers.achievements.list);

  // Providers
  //app.get('/providers', handlers.providers.list);
  //app.post('/providers/:providerId/actions', handlers.providers.list);


  // Users
  app.get('/users', handlers.users.list);
  app.get('/users/:userId', handlers.users.get);
  app.get('/users/:userId/feed', handlers.users.feed);

  // Admin
  app.post('/users', adminAuthMiddleware(), handlers.users.create);
  app.del('/users/:userId', adminAuthMiddleware(), handlers.users.remove);

  app.post('/providers/register', adminAuthMiddleware(), handlers.providers.register);
  app.post('/providers/test', providerAuthMiddleware(), handlers.providers.register);

  return app;
};


exports.register = function(app) {
  app.use('/v1.0', exports.urls());
};
