
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constituencies = require('./constituency.js');
var userSchema = require('./userSchema.js');
var election = require('./election.js');
var nomination = require('./nomination.js');
var voting = new Schema({
								NominationId:  [{
									type: Schema.ObjectId,
									ref: 'nomination'
								}],
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
								createdDate: {type:Date, default: Date.now},
								updatedDate: {type:Date, default: Date.now}

						});


module.exports = mongoose.model('voting', voting);
