/**
 *@author hitjoshi@deloitte.com
 * User Routes for login and register
 *  Via authentication service
 */
'use strict';

var express = require('express');
var router = express.Router();

var ctrlAuth = require('../../auth/authentication');
router.post('/profile', ctrlAuth.userProfile);
router.post('/register', ctrlAuth.register);
router.post('/authenticate', ctrlAuth.login);
router.post('/refresh-token', ctrlAuth.refreshToken);
router.get('/all', ctrlAuth.getAll);
module.exports = router;
