server.register(require('vision'), function(err) {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    layout: true
  });
});
