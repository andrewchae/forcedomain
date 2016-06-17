'use strict';

var redirect = require('./redirect');

var forceDomain = function (options) {
  return function (req, res, next) {
    var protocol = req.headers['x-forwarded-proto'] || req.protocol;
    var host = req.headers['X-Forwarded-Host'] || req.headers.host;
    var newRoute = redirect(protocol, host, req.url, options),
        statusCode;

    if (!newRoute) {
      return next();
    }

    statusCode = (newRoute.type === 'temporary') ? 307 : 301;

    res.writeHead(statusCode, {
      Location: newRoute.url
    });
    res.end();
  };
};

module.exports = forceDomain;
