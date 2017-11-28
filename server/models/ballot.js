
/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var constituencies = require('./constituency.js');

var ballotSchema = new Schema({
							party: { type: String, default:"" },
							Candidate: {type:String, default: ""}
	}, { collection: 'ballot' }, {versionKey: false});


module.exports = mongoose.model('ballot', ballotSchema);
