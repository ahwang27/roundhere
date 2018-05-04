// Load Credentials and Connects to MongoDB/Mongoose
require('dotenv').load();
require('./config/db');

var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// DB logger
var mongomorgan = require('mongo-morgan');

// Authentication modules
var passport = require('passport');
var fs = require('fs');

// Route Connections
var userRouter = require('./routes/users');
var venueRouter = require('./routes/venues');

var app = express();
app.use(logger('short'));
app.use(mongomorgan(process.env.DATABASE_URL, 'dev'));
app.use(passport.initialize());

// Cors Implementation
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/users', userRouter);
app.use('/venues', venueRouter);



module.exports = app;
