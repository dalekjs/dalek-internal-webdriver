module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/screenshot',
    method: 'GET'
  });

};
