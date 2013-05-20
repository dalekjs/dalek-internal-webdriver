module.exports = function (Driver) {

  Driver.addCommand({
    name: 'status',
    url: '/status',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/ime/available_engines',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/ime/active_engine',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/ime/activated',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/ime/deactivate',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/ime/activate',
    method: 'GET'
  });

};
