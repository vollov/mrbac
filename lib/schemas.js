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
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	}
});

//SubjectSchema.pre('remove', function(next) {
//	// remove subject id referenced in Role
//	// Sweepstakes.remove({client_id: this._id}).exec();
//	next();
//});

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