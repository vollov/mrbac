require('./schemas');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


/**
 * maintain a role-subject map in memory
 */ 
var roleSubjectMap= {};

var mrbac = {
		
	/**
	 * load role-subject map from data base
	 */
	init: function(){
		//TODO: populate role subject map from database
		roleSubjectMap['admin'] = ['a1', 'a2', 'a3'];
		roleSubjectMap['visitor'] = ['a1', 'b1', 'b2'];
	},
	
	echo: function(msg) {
		return msg;
	},
	
	/**
	 * name, description, subjects, inherited, created, updated
	 */
	addRole: function(role) {
		
	},
	
	
	removeRole: function(role) {
		
	},
	
	/**
	 * name, url, description, created, updated
	 */
	addSubject: function(s) {
		var subject = new Suject(s);
		
		subject.save(function(error, sub){
			if (err) {
				return next(err);
			}
			
			return sub;
		});
	},
	
	addUserRoles: function(user, rolesArray){
		var promise = User.findById(user.id).exec();
		
		promise.then(function(user) {
			user.roles = rolesArray;
			return user.save(); // returns a promise
		})
		.then(function(user) {
			console.log('updated user: ' + user.name);
			// do something with updated user
		})
		.catch(function(err){
			// just need one of these
			console.log('error:', err);
		});
	},
	
	/**
	 * get all the users
	 */
	getAllUsers: function(){
		
	},
	
	getUserById: function(userId){
		
	},
	
	findUser: function(filter){
		
	},
	
	removeUser: function(userName){
		
	},
	
	addInheritedRoles: function(role, rolesArray){
		
	},
	
	removeInheritedRoles: function(role, rolesArray){
		
	},
	
	addSubjects: function(role, subjectsArray) {
		
	},
	
	removeSubjects: function(role, subjectsArray) {
		
	},
	
	getSubjectsByRole: function(roleName){
		return roleSubjectMap[roleName];
	},
	
	getAllSubjects: function(){
		
	},
	
	can: function(user, subject){
		
	},
	
}

module.exports = mrbac;