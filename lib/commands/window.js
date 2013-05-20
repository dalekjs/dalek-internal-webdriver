module.exports = function (Driver) {

  Driver.addCommand({
    url: '/session/:sessionId/window_handle',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/window_handles',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/window',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/window/:windowHandle/size',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/window/:windowHandle/position',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/window/:windowHandle/maximize',
    method: 'GET'
  });

};
