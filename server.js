//SETUP:
//1. Install express : npm install express --save
//2. Instal body parser: npm install body-parser --save
// Body parser allows to read data from e.g. forms (HTML)
//3. Install mongodb: npm install mongodb --save
//4. Install embedded js: npm install ejs --save
//5. Set view engine to ejs: app.set('view engine', 'ejs')

//Notes:
// All entries saved to path 'entries'
//DB values: entrynum, entrydesc, for the number of the entry and the description.


//Get all the tools we need
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

//Credentials to the db server
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
app.set('port', process.env.PORT || 3000);
console.log('The magic happens on port 3000');

//Body parser must be added before any POST/GET commands
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



MongoClient.connect(configDB.url, (err, database) => {

    if (err) return console.log(err)
    db = database
    })
