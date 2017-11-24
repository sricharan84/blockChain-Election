/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ctrlAuth = require('../../services/votingService');
router.post('/castVote', ctrlAuth.registerVote);
module.exports = router;
