var swiz = require('swiz');

var defs = require('../http/api/defs').defs;


exports.returnResponse = function returnResponse(res, code, data, headers, contentLength) {
  headers = headers || {};
  data = data || '';

  if (!headers.hasOwnProperty('content-length')) {
    headers['Content-Length'] = data.length;
  }

  headers['Connection'] = 'close';

  res.writeHead(code, headers);
  res.end(data);
};


exports.returnError = function returnError(res, code, msg) {
  var obj;
  code = code || 900;
  msg = msg || '';

  obj = {
    'failure reason': msg
  };

  exports.returnJson(res, code, obj);
};


exports.returnJson = function returnJson(res, code, obj) {
  exports.returnResponse(res, code, JSON.stringify(obj));
};


exports.returnData = function(res, obj) {
  var sw = new swiz.Swiz(defs, {stripNulls: false});

  sw.serialize(swiz.SERIALIZATION.SERIALIZATION_JSON, 1, obj, function(err, result) {
    if (err) {
      exports.returnError(res, 500, err);
      return;
    }

    exports.returnResponse(res, 200, result);
  });
};


exports.responseCallback = function responseCallback(res, msg, err) {
  if (err) {
    exports.returnError(res, 400, err.message);
    return;
  }

  exports.returnResponse(res, 200, msg);
};


exports.serializerResponseCallback = function serializerResponseCallback(res, err, data) {
  if (err) {
    exports.returnError(res, 400, err.message);
    return;
  }

  exports.returnData(res, data);
};
