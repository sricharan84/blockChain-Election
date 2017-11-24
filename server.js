/**
 *@author hitjoshi@deloitte.com
 * Hitesh Joshi
 */

var express = require('express');
var mongoose = require('mongoose');
// Property file not checked in src control
var config = require('./env.js').get(process.env.NODE_ENV);
// App runs on 3000 by default
var port = config.port;
// Config
global.getConf = require('app-root-path').require;
// Logger
var logger = require('morgan');
// pulls information from HTML POST
var bodyParser = require('body-parser');
var path = require('path');
var User = require('./server/models/userSchema.js');


// Centralized  Server Router File ============================================
var routes = require('./server/router/index');
var http = require('http');
var passport = require('passport');


require('./server/auth/local/passport').setup(User, config);


// configuration ===============================================================

// mongoose.createConnection(config.mongoUri);


var promise = mongoose.connect(config.mongoUri, {
  useMongoClient: true,
  /* other options */
});

promise.then(function(db) {
if (config.seedDB) {
    require('./server/config/seed');
}
});

mongoose.connection.on('connected', function() {
    console.log('Mongo Db Connection Successful ');
});

mongoose.connection.on('error', function(err) {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});


// Populate databases with sample data
// In case we pre populate data instead of Creating Users on the fly



// Creating Express App
var app = express();


// Adding Router Middlewares

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(passport.initialize());
// Make Routes Availaible to App
app.use(routes);

// Creating an HTTP Server
var server = http.createServer(app);
server.listen(port);
console.log("App listening on port " + port);

// // what is ejs, why have we required it
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// specifying client folder - Angular code goes here
// app.set('views', path.join(__dirname, 'client'));


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });



exports = module.exports = app;





// Get dependencies
// const express = require('express');
// const path = require('path');
// const http = require('http');
// const bodyParser = require('body-parser');

// // Get our API routes
// const api = require('./server/router/api');

// const app = express();

// // Parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// // Set our api routes
// app.use('/api', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// /**
//  * Get port from environment and store in Express.
//  */
// const port = process.env.PORT || '3000';
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port, () => console.log(`API running on localhost:${port}`));