// ext. libs
var http = require('http');
var Q = require('Q');

module.exports = function (WebDriver) {

  /**
   *
   */

  var Driver = {};

  /**
   *
   */

  Driver.parseUrl = function (url, options) {
    Object.keys(options).forEach(function (option) {
      url = url.replace(':' + option, options[option]);
    }.bind(this));

    return url;
  };

  /**
   *
   */

  Driver.generateParamset = function (requestedParams, providedParams) {
    var params = {};

    if (!requestedParams) {
      return params;
    }

    requestedParams.forEach(function (param, idx) {
      params[param] = providedParams[idx];
    });

    return params;
  };

  /**
   *
   */

  Driver.generateBody = function (options, cb, wd, params) {
    if (!cb) {
      return JSON.stringify({desiredCapabilities: {browserName: 'chrome', version: '', platform: 'ANY'}});
    }

    return JSON.stringify(cb.call(wd, params));;
  };

  /**
   *
   */

  Driver.generateRequestOptions = function (hostname, port, prefix, url, method, body) {
        var options = {
            hostname: hostname,
            port: port,
            path: prefix + url,
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length
            }
        };

    return options;
  };

  /**
   *
   */

  Driver.addCommand = function (remote) {
    if (remote.name) {
      WebDriver.prototype[remote.name] = function () {
        var deferred = Q.defer();

        var params = Driver.generateParamset(remote.params, arguments);
        var body = Driver.generateBody({}, remote.onRequest, this, params);
        var options = Driver.generateRequestOptions('localhost', 9000, '/wd/hub', Driver.parseUrl(remote.url, this.options), remote.method, body);
        var req = new http.ClientRequest(options);

        var data = '';

        req.on('response', function (response) {
            response.on('data', function (chunk) { data += chunk; });
            response.on('end', function () {
              if (response.statusCode === 200 || response.statusCode === 303) {
                if (remote.onResponse) {
                  remote.onResponse.call(this, response, remote, options, deferred, data);
                } else {
                  deferred.resolve(data);
                }
              }
            }.bind(this));
        }.bind(this));

        req.end(body);
        return deferred.promise;
      };
    }
  };

  return Driver;
}
