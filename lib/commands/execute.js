module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/execute',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/execute_async',
    method: 'GET'
  });

};
