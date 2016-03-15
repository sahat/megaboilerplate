var request = require('supertest');

var app = require('../app');

describe('GET /', function() {
  it('should render ok', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should render ok', function(done) {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});
