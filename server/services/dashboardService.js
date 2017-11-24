'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/userSchema.js');
var Roles = require('../models/roles.js');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var config = getConf('./env.js').get(process.env.NODE_ENV);
var Voting = require('../models/voting.js');

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