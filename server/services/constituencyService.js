
/**
 *@author mbharti@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var constituency = require('../models/constituency.js');

/**
 * Get list of constituencies
 */
exports.getAllConstituencies = function(req, res) {
    // get a list of all constituencies where nomination date is less then todays date
    return constituency.find({}, '-salt -password').exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => next(err));
}


