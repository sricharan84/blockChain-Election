
/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var roles = require('./roles.js');

var getusersS = new Schema({
							email: { type: String, default:"" },
                            name: { type:String, default: "" },
                            role: [{
                                type: Schema.ObjectId,
                                ref: 'roles'
                            }],
	}, { collection: 'users' }, {versionKey: false});


module.exports = mongoose.model('users', getusersS);
