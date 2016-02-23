server.register(require('vision'), function(err) {
  server.views({
    engines: {
      html: require('jade')
    },
    relativeTo: __dirname,
    path: 'views',
    layout: true
  });
});
