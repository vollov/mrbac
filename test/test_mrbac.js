var should = require('should'); 
var assert = require('assert');

var cfg = require('../config.js')
var rbac = require('../lib/mrbac.js');

var mongoose = require('mongoose');

var log = require('../lib/logger');

var Subject = mongoose.model('Subject');
var Role = mongoose.model('Role');

describe('role based access control with mongodb tests', function() {
	
	
	before(function(done){
		log.debug('db setup test in before()');
		
		mongoose.connect('mongodb://localhost/'+ cfg.db.name, function(err,db){
			if (!err){
				log.debug('Connected to db: ' + cfg.db.name);
			} else{
				//console.dir(err); //failed to connect
				log.error(err);
			}
			done();
		});
	});
	
	after(function(done){
		
		var promise = Subject.remove({name:'post_create' }).exec();
		promise.then(function(doc){
			console.log('subject cleaned');
		}).catch(function(err) {
			/* Error handling */
			log.error('Error remove subject error=%j', err);
			//throw err;
		});
		
		mongoose.connection.close(function(err) {
			done();
		});
	});
	
	describe('echo', function() {
		
		it('should echo', function(done) { 
			var res = rbac.echo("foobar");
			res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
	});
	
	describe('subject', function() {
		
		it('should be able to add new subjects', function(done) { 
			var s1 = {name:'post_create', url:'/post/add', description:'create a new post' };
			
			var promise = rbac.addSubject(s1);
			
			promise.then(function(doc){
				log.info('subject saved.');
				//return doc;
			}).catch(function(err) {
				/* Error handling */
				log.error('Error saving subject %j, error=%j', s1, err);
				//throw err;
			});
			//res.should.containDeep(['a1', 'a2', 'a3']);
			//res.length.should.be.equal(3);
			//res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
	});
	
	describe('role', function() {
		
		it('should be able to query subjects by role', function(done) { 
			rbac.init();
			var res = rbac.getSubjectsByRole("admin");
			res.should.containDeep(['a1', 'a2', 'a3']);
			res.length.should.be.equal(3);
			//res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
		
		it('should be able to add subjects', function(done) { 
			var s2 = {name:'post_update', url:'/post/add', description:'create a new post' };
			
			var promise = rbac.addSubject(s2);
			promise.then(function(subject){
				log.info('subject saved.');
			}).then(rbca.addSubjectsToRole())
			.catch(function(err) {
				log.error('Error saving subject %j, error=%j', s1, err);
			});
			
			
			var res = rbac.getSubjectsByRole("admin");
			res.should.containDeep(['a1', 'a2', 'a3']);
			res.length.should.be.equal(3);
			//res.should.be.equal('foobar');
			//app.should.have.property('api_url', '/api/v1.0');
			//app.should.have.property('port', 3008);
			done();
		});
	});
})
