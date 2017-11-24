/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ballotBoxService = require('../../services/ballotService');
router.get('/ballots', ballotBoxService.getBallotInfo);
module.exports = router;
