module.exports = function (Driver) {

  Driver.addCommand({
    name: 'source',
    url: '/session/:sessionId/source',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'title',
    url: '/session/:sessionId/title',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/orientation',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/alert_text',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/accept_alert',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/dismiss_alert',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/location',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'log',
    url: '/session/:sessionId/log',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/log/types',
    method: 'GET'
  });

};
