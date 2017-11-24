
/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constituency = new Schema({
								constituencyId:{type: Number, required: true},
								constituencyName:{type: String, required: true},
								createdDate: {type:Date, default: Date.now},
								updatedDate: {type:Date, default: Date.now}
						});


module.exports = mongoose.model('constituency', constituency);
