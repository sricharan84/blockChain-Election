
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constituencies = require('./constituency.js');
var userSchema = require('./userSchema.js');
var election = require('./election.js');

var nominations = new Schema({
								//NominationId:{type: Number, required: true},
								UserId:  [{
									type: Schema.ObjectId,
									ref: 'userSchema'
								}],
								ElectionId:  [{
									type: Schema.ObjectId,
									ref: 'election'
								}],
								constituency: [{
									type: Schema.ObjectId,
									ref: 'constituencies'
								}],
								Party:{type: String, required: false},
								Symbol:{type: String, required: true},
								Status:{type: String, required: false},
								createdDate: {type:Date, default: Date.now},
								updatedDate: {type:Date, default: Date.now}
						});


module.exports = mongoose.model('nominations', nominations);
