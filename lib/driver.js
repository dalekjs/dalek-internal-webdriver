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

// export the driver base function
module.exports = function (WebDriver) {

  /**
   * Native Webdriver base class
   *
   * @module DalekJS
   * @class Driver
   * @namespace Internal
   */

  var Driver = {

    /**
     * Parses an JSON Wire protocol dummy url
     *
     * @method parseUrl
     * @param {string} url URL with placeholders
     * @param {object} options List of url options
     * @return {string} url Parsed URL
     */

    parseUrl: function (url, options) {
      Object.keys(options).forEach(function (option) {
        url = url.replace(':' + option, options[option]);
      }.bind(this));

      return url;
    },

    /**
     * Generates a set of params for the message body of the request
     *
     * @method generateParamset
     * @param {object|null} requestedParams Keys & placeholders for the paramset
     * @param {object} providedParams Values for the paramset
     * @return {object} params Params for the message body
     */

    generateParamset: function (requestedParams, providedParams) {
      var params = {};

      if (!requestedParams) {
        return params;
      }

      requestedParams.forEach(function (param, idx) {
        params[param] = providedParams[idx];
      });

      return params;
    },

    /**
     * Generates the message body for webdriver client requests of type POST
     *
     * @method generateBody
     * @param {object} options
     * @param {function} cb
     * @param {Dalek.Internal.Webdriver} wd
     * @param {object} params
     * @return {string} body
     */

    generateBody: function (options, cb, wd, params) {
      // if no cb is given, generate a body with the `desiredCapabilities` object
      if (!cb) {
        return JSON.stringify({desiredCapabilities: {browserName: 'chrome', version: '', platform: 'ANY'}});
      }

      // invoke the given callback & stringify
      var data = cb.call(wd, params);
      return data === null ? '{}' : JSON.stringify(data);
    },

    /**
     * Generates the request options for a webdriver client request
     *
     * @method generateRequestOptions
     * @param {string} hostname Hostname of the webdriver server
     * @param {integer} port Port of the webdriver server
     * @param {string} prefix Url address prefix of the webdriver endpoint
     * @param {string} url Url of the webdriver method
     * @param {string} method Request method e.g. (GET, POST, DELETE, PUT)
     * @param {string} body The message body of the request
     * @return {object} options Request options
     */

    generateRequestOptions: function (hostname, port, prefix, url, method, body) {
      var options = {
        hostname: hostname,
        port: port,
        path: prefix + url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': body.length
        }
      };

      return options;
    },

    /**
     * Generates a new webdriver client command
     * Takes a skeleton of obtions that will be converted
     * into a new function that can be invoked & will issue
     * a webdriver command to the webdriver server
     *
     * @method addCommand
     * @param {object} remote Object skeleton that will be turned into a webdriver client method
     * @chainable
     */

    addCommand: function (remote) {
      // assign the generated function to the webdriver prototype
      WebDriver.prototype[remote.name] = this._generateWebdriverCommand(remote, this);
      return this;
    },

    /**
     * Generates the webdriver callback function
     *
     * @method _generateWebdriverCommand
     * @param {object} remote
     * @param {DalekJs.Internal.Driver} driver
     * @return {object} promise Promise
     */

    _generateWebdriverCommand: function (remote, driver) {
      return function () {
        var deferred = Q.defer();

        // the request meta data
        var params = Driver.generateParamset(remote.params, arguments);
        var body = Driver.generateBody({}, remote.onRequest, this, params);
        var options = Driver.generateRequestOptions(this.opts.host, this.opts.port, this.opts.path, Driver.parseUrl(remote.url, this.options), remote.method, body);

        // generate the request, wait for response & fire the request
        var req = new http.ClientRequest(options);
        req.on('response', driver._onResponse.bind(this, driver, remote, options, deferred));
        req.end(body);

        return deferred.promise;
      };
    },

    /**
     * Response callback function
     *
     * @method _onResponse
     * @param {DalekJs.Internal.Driver} driver
     * @param {object} remote
     * @param {object} options
     * @param {object} deferred
     * @param {object} response
     * @chainable
     */

    _onResponse: function (driver, remote, options, deferred, response) {
      this.data = '';
      response.on('data', function (chunk) { this.data += chunk; }.bind(this));
      response.on('end', driver._onResponseEnd.bind(this, driver, response, remote, options, deferred));
      return this;
    },

    /**
     * Response end callback function
     *
     * @method _onResponse
     * @param {DalekJs.Internal.Driver} driver
     * @param {object} response
     * @param {object} remote
     * @param {object} options
     * @param {object} deferred
     * @chainable
     */

    _onResponseEnd: function (driver, response, remote, options, deferred) {
      return driver[(response.statusCode === 500 ? '_onError' : '_onSuccess')].bind(this)(driver, response, remote, options, deferred);
    },

    /**
     * On error callback function
     *
     * @method _onError
     * @param {DalekJs.Internal.Driver} driver
     * @param {object} response
     * @param {object} remote
     * @param {object} options
     * @param {object} deferred
     * @chainable
     */

    _onError: function (driver, response, remote, options, deferred) {
      if (remote.onError) {
        remote.onError.call(this, response, remote, options, deferred, this.data);
      }
      return this;
    },

    /**
     * On success callback function
     *
     * @method _onSuccess
     * @param {DalekJs.Internal.Driver} driver
     * @param {object} response
     * @param {object} remote
     * @param {object} options
     * @param {object} deferred
     * @chainable
     */

    _onSuccess: function (driver, response, remote, options, deferred) {
      if (remote.onResponse) {
        remote.onResponse.call(this, response, remote, options, deferred, this.data);
      } else {
        deferred.resolve(this.data);
      }
      return this;
    }
  };

  return Driver;
};
