module.exports = function (Driver) {

  Driver.addCommand({
    name: 'screenshot',
    url: '/session/:sessionId/screenshot',
    method: 'GET'
  });

};
