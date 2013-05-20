module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/frame',
    method: 'GET'
  });

};
