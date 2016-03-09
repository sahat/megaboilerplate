/* global describe, it */

var should = require('chai').should();

var foo = 'bar';
var beverages = { tea: ['chai', 'matcha', 'oolong'] };

describe('Example', function() {
  it('should work', function() {
    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
  });
});
