var should = require('should'); 
var assert = require('assert');

var rbac = require('../lib/mrbac.js');

describe('role based access control with mongodb tests', function() {
	
	describe('echo', function() {
		
		it('should echo', function(done) { 
			var res = rbac.echo("foobar");
			res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
	});
	
	describe('role', function() {
		
		it('should be able to query subjects by role', function(done) { 
			rbac.init();
			var res = rbac.getSubjectsByRole("dustin");
			res.should.containDeep(['a1', 'a2', 'a3']);
			res.length.should.be.equal(3);
			//res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
	});
})