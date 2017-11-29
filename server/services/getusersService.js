
/**
 *@author suppuluri@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var users = require('../models/getusers.js');
var roles = require('../models/roles.js')

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.getUsersInfo = function(req, res) {
    // get a list of all users, create a promise,exc() with
    // fullfilled function then() and rejected function catch()
    // then can be multipe , catch just catches the erroors
    return users.find({})
        .then(users => {
            users.forEach(function(user){
                user.forEach(function(r){
                    return roles.find('ObjectId('+r +')')
                    .then(res => {
                        console.log(res);
                    })
                })
                console.log(user.role);
            })
            //console.log(users);
            res.status(200).json(users);
        })
        .catch(err => next(err));
}



