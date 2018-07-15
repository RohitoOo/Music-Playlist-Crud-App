const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')
const config = require('./config/database')



mongoose.connect(config.database)
let db = mongoose.connection;

// Check connection

db.once('open', function() {
  console.log("Connected to MongoDB")
});

// Check for DB errors

db.on('error', function(err) {
  console.log("err")
});

//Init App
const app = express();

// Bring in the  Songs Model

let Song = require('./models/song')


// Load View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// BODY Parse required Middle ware ( code from github)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// Set Public Folder for Static Files

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

//Express session Middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))


// Express Message Flash Middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



// Passport Config

require('./config/passport')(passport);

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());


// // Check if the user is logged in
//
// app.get('*' , function(req, res, next){
//
// res.locals.user = req.user || null ;
// next();
//
// });


// Home Route


app.get('/', function(req, res) {


  Song.find( {user :  ( req.user ? String(req.user._id) : null ) }, function(err, songs) {

    if (err) {
      console.log(err)

    } else {
      res.render('index', {
        titles: "Songs",
        songs: songs,
        user: req.user 
      })
    }
  })
});


// Route files to routes folder

let songs = require('./routes/songs');
app.use('/songs' , songs)


// Routes Files to User Folder

let users = require('./routes/users')
app.use('/users' , users)


// Start Server

app.listen(3000, function() {

  console.log('Server Started on port 3000')
})
