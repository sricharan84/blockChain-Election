
/**
 *@author mbharti@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var elections = require('../models/election.js');

/**
 * Get list of elections
 * restriction: 'admin'
 */
exports.getElectionInfo = function(req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    return elections.find({}, '-salt -password').exec()
        .then(users => {
            console.log(users)
            res.status(200).json(users);
        })
        .catch(err => next(err));
}



