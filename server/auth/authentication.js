/**
 * @author hitjoshi@deloitte.com
 */
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/userSchema.js');
var User_List = require('../models/usersList');
var Roles = require('../models/roles.js');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var config = getConf('./env.js').get(process.env.NODE_ENV);
var Voting = require('../models/voting.js');

module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password ||
        !req.body.role) {
        return res.status(400).json({
            "message": "All fields required"
        });
    }

    var user = new User(req.body);
    user.save()
        .then(function(savedUser) {
            var token = savedUser.generateJwt();
            return res.status(200).json({
                "token": token
            });
        })
        .catch(function(err) {
            console.log(err);            
        });
}

module.exports.userProfile = function(req, res){
    if (!(req.body.email) || !(req.body.password)) {
        return res.status(400).json({
            "message": "Input fields missing"
        });
    }

    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            res.status(404).json(err);
            return;
        }
        if (user) {

            
    var userData = new User(req.body);
    
            user.generateJwt().then(function(result) {
                
                User.find({}).then((users) => {
                    return res.status(200).json({"result":users, "token": result})
                });
                // return res.status(200).json({
                //     "token": result
                // });

            })


        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
}


module.exports.login = function(req, res) {
    if (!(req.body.email) || !(req.body.password)) {
        return res.status(400).json({
            "message": "Input fields missing"
        });
    }
    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            res.status(404).json(err);
            return;
        }
        if (user) {
            user.generateJwt().then(function(result) {
                return res.status(200).json({
                    "token": result
                });

            })


        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
module.exports.isAuthenticated = function() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = `Bearer ${req.query.access_token}`;
            }
            // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
            if (req.query && typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.findById(req.user._id).exec()
                .then(user => {

                    if (!user) {
                        console.log('Authen failed----------------------');
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                })
                .catch(err => next(err));
        });
};

var validateJwt = expressJwt({
    secret: config.secrets.session
});


module.exports.hasRole = function(roleRequired) {


    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }
    return compose()
        .use(this.isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            return Roles.find({
                "_id": {
                    "$in": req.user.role
                }
            }, {
                "roleId": 1,
                "_id": 0
            }).then(function(result) {
                var roleArray = [];
                for (var i = 0; i < result.length; i++) {
                    roleArray.push(result[i].roleId);
                }
                return Promise.resolve(roleArray);
            }, function(error) {
                console.log('------------ error ----- ');
                console.log(error);
            }).then(function(res) {
                if (res.indexOf(roleRequired) != -1) {
                    return next();
                } else {
                    return res.status(403).json({
                        "message": "Forbidden Route"
                    });
                }
                //res has roleRequired

            }).catch(function(err) {
                console.log(err);
            });

        });
};

module.exports.refreshToken = function(req, res) {
    console.log("refreshing token ----- >");
    console.log('token' + req.body.token);
    // verify the existing token
    var profile = jwt.verify(req.body.token, config.secrets.session);

    console.log(profile);
    // if more than 14 days old, force login - we can remove this check
    if ((profile.iat - new Date()) > 7) { // iat == issued at
        console.log('expired ---->');
        return res.send(401); // re-logging
    }

    // check if the user still exists or if authorization hasn't been revoked
    // if (!valid) return res.send(401); // re-logging

    var email = profile.email;
    User_List.findOne({
        email: email.toLowerCase()
    }).then(function(user) {
        var refreshed_token = user.generateJwt();
        return res.json({
            token: refreshed_token
        });
    })
    // issue a new token

};

module.exports.getVotingResult = function(req, res) {
	console.log('test dashboard');
	Voting.aggregate([
  {$group : {_id : {NominationId: "$NominationId", constituency: "$constituency", ElectionId:"$ElectionId"},count: { $sum: 1}}}, 
    {$lookup: {from: "nominations", localField: "_id.NominationId", foreignField: "_id", as: "nomiDetails"}}, {$unwind:"$nomiDetails"},
    {$lookup: {from: "users", localField: "nomiDetails.UserId", foreignField: "_id", as: "details"}}, {$unwind:"$details"},
    {$lookup: {from: "constituencies", localField: "_id.constituency", foreignField: "_id", as: "Area"}},{$unwind:"$Area"},
    {$lookup: {from: "elections", localField: "_id.ElectionId", foreignField: "_id", as: "electionDetails"}},{$unwind:"$electionDetails"},
    {$match: {details: {$ne: []} ,Area: {$ne: []}, electionDetails:{$ne:{}}
    , 'electionDetails.ResultDate' :{ '$lt' : new Date() }
    }},
     {$project:{"_id":1,"count":1,  "Name":"$details.name", "Constitency":"$Area.constituencyName"}}
]).exec().then((votings) => {
	    console.log("==========================");
	    console.log(votings);
	    return res.json({votings})}
	) };


module.exports.getAll = function(req, res) {
User.find({}).then((users) => {return res.json({
users
})}
)};