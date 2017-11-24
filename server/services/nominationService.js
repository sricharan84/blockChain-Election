
/**
 *@author mbharti@deloitte.com
 */
'use strict';

var config = getConf('./env.js').get(process.env.NODE_ENV);
var jwt = require('jsonwebtoken');
var Nominations = require('../models/nomination.js');
var election = require('../models/election.js');
var nominations = require('../models/nomination.js');
var User = require('../models/userSchema.js');




exports.getAllCandidates = function (req, res) {
    console.log("teston------------------>");
    console.log(req.query);
    console.log(req.query.id);
    var paramUserId = req.query.id;
    var startDate = new Date(); // this is the starting date that looks like ISODate("2014-10-03T04:00:00.188Z")

    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);

    var dateMidnight = new Date(startDate);
    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);

    User.findOne({
        _id: paramUserId
    }).then(function (user) {
        console.log(user);
           nominations.aggregate([
            { $match: { Status: "ACCEPTED", constituency: user.constituency } },
            { $lookup: { from: "users", localField: "UserId", foreignField: "_id", as: "userData" } }, { $unwind: "$userData" },
            { $lookup: { from: "elections", localField: "ElectionId", foreignField: "_id", as: "electionDetails" } }, { $unwind: "$electionDetails" },
            { $match: { userData: { $ne: [] }, electionDetails: { $ne: [] }, 'electionDetails.ElectionDate': { '$lt': dateMidnight, '$gt': startDate } } }
        ]).exec().then((candidates) => {
            console.log(candidates);
            return res.json({ candidates })
        }
            )
    })




}

/**
 * register Nomination for an election
 */
exports.registerCandidate = function (req, res) {
    console.log("===inside Nomination service=====");
    console.log(req.body);
    console.log(req.body.name);

    var nomination1 = new Nominations({
								Party: req.body.party,
								Symbol: req.body.symbol,
								Status: 'ACCEPTED',
        constituency: req.body.selectedConstituency,
        ElectionId: req.body.selectedElection,
        UserId: req.body._id
    });
    console.log('Object created');
    nomination1.save()
        .then(function (savedUser) {
            console.log('finished creating nomination');
            return res.status(200);
        })
        .catch(function (err) {
            console.log(err);
            console.log('error occurred');
        });
}



