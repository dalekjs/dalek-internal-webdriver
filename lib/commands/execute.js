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

/**
 * Script execution related Webdriver endpoints
 *
 * @param {Dalek.Internal.Webdriver} Driver Webdriver client instance
 * @return {Dalek.Internal.Webdriver} Driver Webdriver client instance
 */

module.exports = function (Driver) {
  'use strict';

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
   * The executed script is assumed to be synchronous and the result of evaluating the script is returned to the client.
   * The script argument defines the script to execute in the form of a function body.
   * The value returned by that function will be returned to the client.
   * The function will be invoked with the provided args array and the values may be accessed
   * via the arguments object in the order specified.
   *
   * @method execute
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/execute
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} script The script to execute.
   * @param {POST} args The script arguments.
   */

  Driver.addCommand({
    name: 'execute',
    url: '/session/:sessionId/execute',
    method: 'POST',
    params: ['script', 'arguments'],
    onRequest: function (raw) {
      var script = raw.script.script.replace(/\\n/g, ' ').replace(/\\t/g, ' ');
      var userArgs = script.substring(script.indexOf('(') + 1, script.indexOf(')'));
      
      script = script.substring(script.indexOf('{') + 1, script.lastIndexOf('}'));
      script = 'var args = Array.prototype.slice.call(arguments, 0); var shifted = args.shift(); var dalek = {store: {}, test: [], assert: {}, _assert: { ok: function (isOk, message) { this.test.push({ok: isOk, message: message}); }}, data: function (key, value) { if(value) { this.store[key] = value; return this; } return this.store[key] || null; }}; dalek.store = shifted; dalek.assert.ok = function () { return dalek._assert.ok.apply(dalek, Array.prototype.slice.call(arguments)); }; var userRet = function(' + userArgs + ') {' + script + '}.apply(dalek, args); return {dalek: dalek.store, test: dalek.test, userRet: userRet}';
      
      return {script: script, args: raw.script.arguments};
    }
  });

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
   * The executed script is assumed to be asynchronous and must signal that is done by invoking the provided callback,
   * which is always provided as the final argument to the function. The value to this callback will be returned to the client.
   * Asynchronous script commands may not span page loads.
   * If an unload event is fired while waiting for a script result, an error should be returned to the client.
   *
   * The script argument defines the script to execute in teh form of a function body.
   * The function will be invoked with the provided args array and the values may be accessed
   * via the arguments object in the order specified.
   * The final argument will always be a callback function that must be invoked to signal that the script has finished.
   *
   * @method executeAsync
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/execute_async
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} script The script to execute.
   * @param {POST} args The script arguments.
   */

  Driver.addCommand({
    name: 'executeAsync',
    url: '/session/:sessionId/execute_async',
    method: 'POST',
    params: ['script', 'arguments']
  });

};
