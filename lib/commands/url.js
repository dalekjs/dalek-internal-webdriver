module.exports = function (Driver) {
  Driver.addCommand({
    name: 'url',
    url: '/session/:sessionId/url',
    method: 'POST',
    params: ['page'],
    onRequest: function (params) {
      return {url: params.page};
    },
    onResponse: function (request, remote, options, deferred) {
      deferred.resolve(this);
    }
  });

  Driver.addCommand({
    name: 'getUrl',
    url: '/session/:sessionId/url',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'forward',
    url: '/session/:sessionId/forward',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'back',
    url: '/session/:sessionId/back',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'refresh',
    url: '/session/:sessionId/refresh',
    method: 'GET'
  });
};
