/**
 *@author mbharti@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ctrlAuth = require('../../services/constituencyService');
router.get('/getAllConstituencies', ctrlAuth.getAllConstituencies);
module.exports = router;
