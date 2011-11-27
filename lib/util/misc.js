exports.objToList = function objToList(obj) {
  var key, value, result = [];

  if (!obj) {
    return [];
  }

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      result.push(value);
    }
  }

  return result;
};


exports.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


exports.randstr = function(len) {
  var chars, r, x;

  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  r = [];

  for (x = 0; x < len; x++) {
    r.push(chars[exports.getRandomInt(0, chars.length - 1)]);
  }

  return r.join('');
};


exports.getIdFromString = function(string) {
  return string.toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '');
};
