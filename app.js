var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var screenshotRouter = require('./routes/screenshots');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
app.use(logger('dev'));
// app.use(express.json());
//
// app.use(bodyParser.urlencoded({
//     extended: true,
//     limit: '500mb',
//     parameterLimit: 100000,
// }));

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/screenshots', screenshotRouter);


module.exports = app;
