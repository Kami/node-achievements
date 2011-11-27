var handlers = [
  'feed',
  'leaderboard',
  'achievements',
  'users',
  'providers'
];


handlers.forEach(function(handler) {
  exports[handler] = require('./' + handler);
});
