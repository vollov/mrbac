require('./schemas');

/**
 * maintain a role-subject map in memory
 */ 
var roleSubjectMap= {};

var mrbac = {
		
	/**
	 * load role-subject map from data base
	 */
	init: function(){
		roleSubjectMap['dustin'] = ['a1', 'a2', 'a3'];
		roleSubjectMap['martin'] = ['a1', 'b1', 'b2'];
	},
	
	echo: function(msg) {
		return msg;
	},
	
	addUser: function(user) {
		
	},
	
	addRole: function(role) {
		
	},
	
	removeRole: function(role) {
		
	},
	
	addSubject: function(subject) {
		
	},
	
	addUserRoles: function(user, rolesArray){
		
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