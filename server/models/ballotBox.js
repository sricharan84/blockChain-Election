
/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constituencies = require('./constituency.js');

var ballotSchema = new Schema({
		party: { type: String, default:"" },
	});

	var cs = new Schema({
		name:{type: String, default:""}
	})

	var roleS = new Schema({
		roleName:{ type: String, default:""}
	})

module.exports = mongoose.model('ballot', ballotSchema);
