/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var userService = require('../../services/userService');
var nominationServ = require('../../services/nominationService');
//router.get('/retreiveCandidateDets/:id', ctrlAuth.retreiveCandidateDets);
//TODO - Change this to GET
router.post('/retreiveCandidateDets/', userService.retreiveCandidateDets);
router.post('/register/', nominationServ.registerCandidate);
router.get('/getAllCandidates', nominationServ.getAllCandidates);
module.exports = router;
