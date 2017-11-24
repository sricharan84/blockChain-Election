/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var electionService = require('../../services/electionService');
router.get('/elections', electionService.getElectionInfo);
module.exports = router;
