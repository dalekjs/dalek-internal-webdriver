module.exports = function (Driver) {

  Driver.addCommand({
    name: 'element',
    url: '/session/:sessionId/element',
    method: 'POST',
    params: ['selector'],
    onRequest: function (params) {
      var type = 'css selector';
      return {using: type, value: params.selector};
    },
    onResponse: function (request, remote, options, deferred, data) {
      this.options.id = JSON.parse(data).value.ELEMENT;
      deferred.resolve(data);
    },
    onError: function (request, remote, options, deferred, data) {
      data = JSON.parse(data);
      deferred.resolve(JSON.stringify({'sessionId': data.sessionId, value: -1}));
    }
  });

  Driver.addCommand({
    name: 'elements',
    url: '/session/:sessionId/elements',
    method: 'POST',
    params: ['selector'],
    onRequest: function (params) {
      var type = 'css selector';
      return {using: type, value: params.selector};
    },
    onResponse: function (request, remote, options, deferred, data) {
      deferred.resolve(data);
    },
    onError: function (request, remote, options, deferred, data) {
      data = JSON.parse(data);
      deferred.resolve(JSON.stringify({'sessionId': data.sessionId, value: -1}));
    }
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
    name: 'click',
    url: '/session/:sessionId/element/:id/click',
    method: 'POST'
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
    name: 'getAttribute',
    url: '/session/:sessionId/element/:id/attribute/:name',
    method: 'GET',
    params: ['name'],
    onRequest: function (params) {
      this.options.name = params.name;
      return null;
    }
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/equals/:other',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'displayed',
    url: '/session/:sessionId/element/:id/displayed',
    method: 'GET'
  });

  Driver.addCommand({
    url: '/session/:sessionId/element/:id/location',
    method: 'GET'
  });

  Driver.addCommand({
    name: 'locationInView',
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
