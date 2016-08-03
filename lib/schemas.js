var mongoose = require('mongoose');

var SubjectSchema = new mongoose.Schema({
	name : {
		type : String,
		lowercase : true,
		unique : true
	},
	url : {
		type : String,
		lowercase : true,
		unique : true
	},
	description: {
		type: String
	},
	created: {
		type: Date
	},
	updated: {
		type: Date
	}
});

mongoose.model('Subject', SubjectSchema);

var RoleSchema = new mongoose.Schema({
	name : {
		type : String,
		lowercase : true,
		unique : true
	},
	description: {
		type: String
	},
	subjects : [ {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Subject'
	} ],
	inherited: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role'
	}],
	created: {
		type: Date
	},
	updated: {
		type: Date
	}
});

mongoose.model('Role', RoleSchema);

var UserSchema = new mongoose.Schema({
	username : {
		type : String,
		lowercase : true,
		unique : true
	},
	roles : [ {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Role'
	} ],
	created: {
		type: Date
	},
	updated: {
		type: Date
	}
});
mongoose.model('User', UserSchema);