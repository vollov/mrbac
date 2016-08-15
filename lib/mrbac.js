require('./schemas.js');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var _ = require('underscore');
var Subject = mongoose.model('Subject');

var log = require('../lib/logger');

/**
 * maintain a role-subject map in memory
 */ 
var roleSubjectMap= {};

var Mrbac = function() {
	
};

/**
 * Test function
 */
Mrbac.prototype.echo = function(msg){
	return msg;
};

Mrbac.prototype.init = function(msg){
	roleSubjectMap['admin'] = ['a1', 'a2', 'a3'];
	roleSubjectMap['visitor'] = ['a1', 'b1', 'b2'];
};

Mrbac.prototype.getSubjectsByRole = function(roleName){
	return roleSubjectMap[roleName];
};

/**
 * Return a promise to handle, see test driver for usage
 */
Mrbac.prototype.addSubject = function(s){
	var subject = new Subject(s);
	return subject.save();
};


// add subjects(list)
Mrbac.prototype.addSubjects = function(subject_list) {
	return Subject.insertMany(subject_list);
};

/**
 * subject should have at least id, name, url
 * @return promise
 */
Mrbac.prototype.addSubjectsToRole = function(subject_list, role_id) {
	var promise = Role.findById(role_id).exec();
	return promise.then(function(role){
		var subjects = role.subjects.concat(subject_list);
		role.subjects = _.uniq(subjects);
		role.save();
	});
};

/**
 * remove subjects from a role
 * 
 * @return a promise
 */
Mrbac.prototype.removeSubjectsFromRole = function(subject_list, id) {
	var promise = Role.findById(role_id).exec();
	return promise.then(function(role){
		role.subjects = _.difference(role.subjects, subject_list);
		role.save();
	});
};

/**
 * 
 * @return a promise
 */
Mrbac.prototype.removeSubjectById = function(id) {
	return Subject.findById(id).remove().exec();
};

/**
 * remove subjects and referenced subjects in role
 */
Mrbac.prototype.removeSubjects = function(subject_list) {
	var ids = _.map(subject_list, function(item){ return item['id']; });
	//return Subject.find(id:{ $in: ids }).remove().exec();
};

Mrbac.prototype.addRole = function(r) {
	var role = new Role(r);
	return role.save();
};

// add roles(list)
Mrbac.prototype.addRoles = function(role_list) {
	return Role.insertMany(role_list);
};

/**
* return a promise
*/
Mrbac.prototype.removeRoleById = function(id) {
	return Role.findById(id).remove().exec();
};

Mrbac.prototype.removeRoles = function(role_list) {
	var ids = _.map(role_list, function(item){ return item['id']; });
	//return Role.find('id':{ $in: ids }).remove().exec();
};

//var mrbac = function(options){
//	
//	if (!options || !options.name) throw new Error('db name should be set');
//	
//	return {
//		/**
//		 * load role-subject map from data base
//		 */
//		init: function(){
//			//TODO: populate role subject map from database

//		},
//		
//		addInheritedRoles: function(role, rolesArray){
//			
//		},
//		
//		removeInheritedRoles: function(role, rolesArray){
//			
//		},
//		
//		
//		getAllSubjects: function(){
//			
//		},
//		
//		/**
//		 * reorder the role and subject hierarchy
//		 */
//		flash: function(){
//			// move shared subjects up
//			
//			// remove duplicated parent roles
//			
//		},
//		
//		/**
//		 * check if a role have access to a subject
//		 */
//		can: function(role, subject){
//			
//		},
//	}
//}
var mrbac = new Mrbac();
exports = module.exports = mrbac;