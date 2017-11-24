
/**
 *@author mbharti@deloitte.com
 * 
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var Nominations = require('../models/nomination.js');
var election = require('../models/election.js');
var nominations = require('../models/nomination.js');
var User = require('../models/userSchema.js');
var Voting = require('../models/voting.js');


/**
 * register Voting in an election
 */
exports.registerVote = function (req, res) {
    console.log("===inside registerVote service=====");
    console.log(req.body);
    console.log(req.body.name);

    var Voting1 = new Voting({
								
        UserId: req.body.citizenId,
        NominationId: req.body.candidateId,
        ElectionId: req.body.electionId,
       constituency:req.body.constituencyId
    });
    console.log('Object created');
    Voting1.save()
        .then(function (voteCasted) {
            console.log('finished creating voting');
            return res.status(200);
        })
        .catch(function (err) {
            console.log(err);
            console.log('error occurred');
        });
}