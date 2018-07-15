const express = require('express');
const router = express.Router();

// Bring in the  Songs Model

let Song = require('../models/song');

let User = require('../models/user');

// Add Song Route

router.get('/add', ensureAuthenticated, function(req, res) {

  res.render('add_song', {user: req.user})

});

// Submit Route

router.post('/add', function(req, res) {

  let song = new Song();

  song.name = req.body.name;
  song.artist = req.body.artist;
  song.user = req.body.user

  song.save(function(err) {

    if (err) {
      console.log(err)
    } else {
      req.flash('success', "Song Added To Playlist")
      res.redirect('/');
    }
  })

})

// Route for Editing Single Song

router.get('/edit/:id', ensureAuthenticated, function(req, res) {

  Song.findById(req.params.id, function(err, song) {

    res.render('edit_song', {song: song});

  })
})

// Submit AFTER editing Route

router.post('/edit/:id', function(req, res) {

  let song = {}

  song.name = req.body.name;
  song.artist = req.body.artist;

  let query = {
    _id: req.params.id
  }

  Song.update(query, song, function(err) {

    if (err) {
      console.log(err)
    } else {
      req.flash('success', "Song Updated")
      res.redirect('/');
    }
  })

})

// Delete Request Using Jquery & Ajax

router.delete('/:id', ensureAuthenticated, function(req, res) {

  let query = {
    _id: req.params.id
  }

  Song.remove(query, function(err) {

    if (err) {
      console.log(err)
    }
    res.send('Success')

  })

})

// Route for Single Song

router.get('/:id', function(req, res) {

  Song.findById(req.params.id, function(err, song) {

    res.render('song', {

      song: song,
      user: req.user
    });

  })
})

function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {

    return next();

  } else {
    req.flash('danger', 'Please Login ');
    res.redirect('/users/login');
  }
}

module.exports = router;
