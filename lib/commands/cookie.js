module.exports = function (Driver) {

  Driver.addCommand({
    name: 'cookie',
    url: '/session/:sessionId/cookie',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/cookie/:name',
    method: 'GET'
  });

};
