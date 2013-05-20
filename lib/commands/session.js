module.exports = function (Driver) {

  Driver.addCommand({
    name: 'createSession',
    url: '/session',
    method: 'POST',
    onResponse: function (request, remote, options, deferred) {
      this.options.sessionId = request.headers.location.replace('http://' + options.hostname + ':' + options.port + options.path + '/', '');
      deferred.resolve(this);
    }
  });

  Driver.addCommand({
    name: 'sessions',
    url: '/sessions',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId',
    method: 'GET'
  });

};
