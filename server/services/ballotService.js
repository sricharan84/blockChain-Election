
/**
 *@author suppuluri@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var ballot = require('../models/ballot.js');

/**
 * Get list of elections
 * restriction: 'admin'
 */
exports.getBallotInfo = function(req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    return ballot.find({}).exec()
        .then(users => {
            console.log(users);
            res.status(200).json(users);
        })
        .catch(err => next(err));
}

exports.postBallotInfo = function(req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors

    // ballot.insertOne().exec()

    console.log(req.body);
    return ballot.insertMany([req.body])
        .then(() => {
            res.status(200);
        })
        .catch(err => next(err));
}



