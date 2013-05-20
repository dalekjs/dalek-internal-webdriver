module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/local_storage',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/local_storage/key/:key',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/local_storage/size',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/session_storage',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/session_storage/key/:key',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/session_storage/size',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/application_cache/status',
    method: 'GET'
  });

};
