module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/moveto',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/click',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/buttondown',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/buttonup',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/doubleclick',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/touch/click',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/touch/down',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/touch/up',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/move',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/scroll',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/scroll',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/doubleclick',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/longclick',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/flick',
    method: 'GET'
  });

  Driver.addCommand({
    url: 'session/:sessionId/touch/flick',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/keys',
    method: 'GET'
  });

};
