
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constituencies = require('./constituency.js');

var electionSchema = new Schema({
		ElectionId: { type: String, required: true},
		ElectionStatus: Number,
		ConstituencyId: {type:Number, default: Date.now},
		NominationDate: {type:Date, default: Date.now},
		ResultDate:{type:Date, default: Date.now}
	});


module.exports = mongoose.model('elections', electionSchema);
