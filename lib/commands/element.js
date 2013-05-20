module.exports = function (Driver) {

  Driver.addCommand({
    name: 'element',
    url: '/session/:sessionId/element',
    method: 'POST',
    params: ['selector'],
    onRequest: function (params) {
      var type = 'css selector';
      if (params.selector.charAt(0) === '#') {
        type = 'id';
        params.selector = params.selector.substring(1);
      }
      return {using: type, value: params.selector};
    },
    onResponse: function (request, remote, options, deferred, data) {
      this.options.id = JSON.parse(data).value.ELEMENT;
      deferred.resolve(this);
    }
  });

  Driver.addCommand({
    url: '/session/:sessionId/elements',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/active',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/element',
    method: 'GET'

  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/elements',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/click',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'submit',
    url: '/session/:sessionId/element/:id/submit',
    method: 'POST'
  });

  Driver.addCommand({
    name: 'text',
    url: '/session/:sessionId/element/:id/text',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'val',
    url: '/session/:sessionId/element/:id/value',
    method: 'POST',
    params: ['text'],
    onRequest: function (params) {
      return {value: params.text.split('')};
    }
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/name',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/clear',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/selected',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/enabled',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/attribute/:name',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/equals/:other',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/displayed',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/location',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/location_in_view',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/size',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/css/:propertyName',
    method: 'GET'
  });

};
