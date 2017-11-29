/**
 *@author suppuluri@deloitte.com
 * User Routes for dashboard service
 */
'use strict';

var express = require('express');
var router = express.Router();

var getusers = require('../../services/getusersService.js');
router.get('/getusers', getusers.getUsersInfo);
module.exports = router;
