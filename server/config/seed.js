/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../models/userSchema.js');
var role = require('../models/roles.js');
var constituency = require('../models/constituency.js');

/// Dummy data creation till screens are ready
var election = require('../models/election.js');
var nomination = require('../models/nomination.js');
var voting = require('../models/voting.js');


User.find({}).then(function(users) {
    if (users.length > 0) {
        // do not populate Again
        console.log('Users Already populated');
    } else {

		constituency.remove({}, function(err, removed) {
            console.log("Constituencies removed");
        });
		
			var constituency1 = new constituency(
			{constituencyId: 100, constituencyName: "B.B.M.P(CENTRAL)"});
			var constituency2 = new constituency(
			{constituencyId: 101, constituencyName: "B.B.M.P(NORTH)"});
			var constituency3 = new constituency(
			{constituencyId: 102, constituencyName: "B.B.M.P(SOUTH)"});
			var constituency4 = new constituency(
			{constituencyId: 103, constituencyName: "BAGALKOT"});
			var constituency5 = new constituency(
			{constituencyId: 104, constituencyName: "BANGALORE RURAL"});
			var constituency6 = new constituency(
			{constituencyId: 106, constituencyName: "BANGALORE URBAN"});
			
		 constituency.create(
                constituency1,
				constituency2,
				constituency3,
				constituency4,
				constituency5,
				constituency6
            )
            .then(() => {
                console.log('finished populating constituencies');	
				 role.remove({}, function(err, removed) {
					console.log("Roles removed");
				});
		
        var citizen = new role({
            roleId: 100,
            roleName: "CITIZEN"
        });

        var electionCommission = new role({
            roleId: 200,
            roleName: "ELECTION_COMMISION"
        });

        var candidate = new role({
            roleId: 300,
            roleName: "CANDIDATE"
        });

        var otherUser = new role({
            roleId: 400,
            roleName: "OTHER_USER"
        });

        role.create(
                citizen,
                electionCommission,
                candidate,
                otherUser
            )
            .then(() => {
                console.log('finished populating roles');
				
            var citizen1 = new User({
            provider: 'local',
            role: [
                citizen._id
            ],
            name: 'Amol',
            email: 'Amol@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 30,
			gender: "Male",
			MaritalStatus: "Married",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:''
        });
        var citizen2 = new User({
           provider: 'local',
            role: [
                citizen._id
            ],
            name: 'Aadesh',
            email: 'Aadesh@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 29,
			gender: "Male",
			MaritalStatus: "Single",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:''
        });
		var citizen3 = new User({
           provider: 'local',
            role: [
                citizen._id
            ],
            name: 'Sai',
            email: 'Sai@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 28,
			gender: "Male",
			MaritalStatus: "Single",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:''
        });
        var electionCommision1 = new User({
            provider: 'local',
            role: [citizen._id, electionCommission._id
            ],
            name: 'Imran',
            email: 'Imran@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 31,
			gender: "Male",
			MaritalStatus: "Married",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:''
        });

        var candidate1 = new User({
            provider: 'local',
            role: [
			  citizen._id,
              candidate._id
            ],
            name: 'Mohit',
            email: 'Mohit@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 32,
			gender: "Male",
			MaritalStatus: "Married",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:'Done'
        });
		
		var candidate2 = new User({
            provider: 'local',
            role: [
			  citizen._id,
              candidate._id
            ],
            name: 'Hitesh',
            email: 'Hitesh@deloitte.com',
			password: 'test',
            address: "Powai, Mumbai",
			age: 31,
			gender: "Male",
			MaritalStatus: "Married",
			constituency: [
                constituency1._id
            ],
			BackgroundVerification:'Done'
        });

         User.create(
                citizen1,
                citizen2,
                citizen3,
                electionCommision1,
                candidate1,
                candidate2

            ).then((res) => {
                console.log('finished populating users');
				
				/// Dummy record for Elections till screens are ready
					var election1 = new election({
						provider: 'local',
						constituency: [
							constituency1._id
						]
					});
					 election.create(
						election1

					).then((res) => {
						console.log('finished populating election details');
							var nomination1 = new nomination({
								provider: 'local',
								constituency: [
									constituency1._id
								],
								UserId: [
									candidate1._id
								],
								ElectionId : [
									election1._id
								],
								Party:'BJP',
								Symbol:'LOTUS',
								Status:'ACCEPTED'
							});
							var nomination2 = new nomination({
								provider: 'local',
								constituency: [
									constituency1._id
								],
								UserId: [
									candidate2._id
								],
								ElectionId : [
									election1._id
								],
								Party:'CONGRESS',
								Symbol:'HAND',
								Status:'ACCEPTED'
							});
							 nomination.create(
								nomination1,
								nomination2
							).then((res) => {
								console.log('finished populating nomination details');
								
								
								var voting1 = new voting({
									provider: 'local',
									NominationId: [
										nomination1._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen1._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting2 = new voting({
									provider: 'local',
									NominationId: [
										nomination1._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen2._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting3 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										citizen3._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting4 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										candidate1._id
									],
									ElectionId : [
										election1._id
									],
								});
								var voting5 = new voting({
									provider: 'local',
									NominationId: [
										nomination2._id
									],
									constituency: [
										constituency1._id
									],
									UserId: [
										candidate2._id
									],
									ElectionId : [
										election1._id
									],
								});
								 voting.create(
									voting1,
									voting2,
									voting3,
									voting4,
									voting5

								).then((res) => {
									console.log('finished populating voting details');
								});
							});
					});
				/// Dummy record for Elections till screens are ready
			
            });
     });
	 });
    }
});
