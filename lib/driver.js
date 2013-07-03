/*!
 *
 * Copyright (c) 2013 Sebastian Golasch
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

// ext. libs
var http = require('http');
var Q = require('q');

/**
 *
 * @module
 * @class
 * @namespace
 */

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

        if (body === 'null') {
          body = '{}';
        }

        var options = Driver.generateRequestOptions(this.opts.host, this.opts.port, this.opts.path, Driver.parseUrl(remote.url, this.options), remote.method, body);
        var req = new http.ClientRequest(options);

        var data = '';

        req.on('response', function (response) {
            response.on('data', function (chunk) { data += chunk; });
            response.on('end', function () {



              if (response.statusCode === 500) {
                if (remote.onError) {
                  remote.onError.call(this, response, remote, options, deferred, data);
                }
              }
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
