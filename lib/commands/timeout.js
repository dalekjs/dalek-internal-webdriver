module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/timeouts',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/timeouts/async_script',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/timeouts/implicit_wait',
    method: 'GET'
  });

};
