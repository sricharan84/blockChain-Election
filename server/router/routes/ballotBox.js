/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ballotBoxService = require('../../services/ballotService.js');
router.get('/ballot', ballotBoxService.getBallotInfo);
router.post('/ballot', ballotBoxService.postBallotInfo);
module.exports = router;
