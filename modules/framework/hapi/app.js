var Hapi = require('hapi');
var Hoek = require('hoek');
//= REACT_REQUIRE
//= TEMPLATE_ENGINE_REQUIRE
//= DATABASE_REQUIRE
//= PASSPORT_REQUIRE
//= CSS_PREPROCESSOR_MIDDLEWARE_REQUIRE

var server = new Hapi.Server();
//= DATABASE_CONNECTION
//= TEMPLATE_ENGINE

//= CSS_PREPROCESSOR_MIDDLEWARE
//= PASSPORT_MIDDLEWARE

server.connection({
  host: 'localhost',
  port: 3000
});

//= HOME_ROUTE
//= REACT_SERVER_RENDERING


server.start(function() {
  console.log('Server running at:', server.info.uri);
});
