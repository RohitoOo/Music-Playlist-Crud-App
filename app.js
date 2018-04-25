const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/songsdatabase')
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

// Home Route

app.get('/', function(req, res) {

  Song.find({}, function(err, songs) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        titles: "Songs",
        songs: songs
      })
    }
  })
});


// Route for Single article

app.get('/song/:id', function(req, res) {

    Song.findById(req.params.id, function(err, song) {

      res.render('song', {song: song});

    })
  })





// Add Song Route

app.get('/songs/add', function(req, res) {

  res.render('add_song'), {}

});

// Submit Route

app.post('/songs/add', function(req, res) {

  let song = new Song();

  song.name = req.body.name;
  song.artist = req.body.artist;

  song.save(function(err) {

    if (err) {
      console.log(err)
    } else {
      res.redirect('/');
    }
  })

})

// Route for Editing Single article

app.get('/song/edit/:id', function(req, res) {

    Song.findById(req.params.id, function(err, song) {

      res.render('edit_song',

      {song: song}
    );

    })
  })





// Submit AFTER editing Route

app.post('/songs/edit/:id', function(req, res) {

  let song = {}

  song.name = req.body.name;
  song.artist = req.body.artist;

let query = {_id:req.params.id}

  Song.update(query, song, function(err) {

    if (err) {
      console.log(err)
    } else {
      res.redirect('/');
    }
  })

})



// Delete Request Using Jquery & Ajax

app.delete('/song/:id' , function(req, res) {

let query = { _id : req.params.id}

Song.remove(query, function(err){

if(err){
  console.log(err)
}
res.send('Success')


})

})


// Start Server

app.listen(3000, function() {

  console.log('Server Started on port 3000')
})
