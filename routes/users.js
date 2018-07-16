const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

// Bring in the  Songs Model

let User = require('../models/user')

//Register Form

router.get('/register', function(req, res) {

  res.render('register');

});

// Register User Route

router.post('/register', function(req, res) {

  const username = req.body.name;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new User({username: username, password: password});



  req.checkBody('password2', "Passwords Do Not Match").equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors: errors})
  } else {


bcrypt.genSalt(10, function(err, salt) {

    bcrypt.hash(newUser.password, salt , (err, hash) => {

      if(err) {
            console.log(err)
          }
    // Password converted to Hash
        newUser.password = hash

    // Ready to save to Database

    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Registration Complete! Login and Create Your Playlist.');
        res.redirect('/users/login');
      }
    })

    } )


})

  }
});


// bcrypt.genSalt(10, function (err, salt){
//   bcrypt.hash(newUser.password , salt , function(err , hash) {
//
//     if(err){
//
//       console.log(err);
//     }
//     newUser.password = hash ;
//
//
//     newUser.save(function(err){
//       if(err){
//         console.log(err);
//         return;
//       }
//       else {
//         req.flash('success' , 'Registration Complete! Login and Create Your Playlist.' );
//         res.redirect('/users/login');
//       }
//     })
//   })
// })



// Login Form

router.get('/login', function(req, res) {

  res.render('login')
});

// Login Process

router.post('/login', function(req, res, next) {

  passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);

})

// Logout

router.get('/logout', function(req, res) {

  req.logout();
  req.flash('success', "Peace Out! ");
  res.redirect('/users/login');

})

module.exports = router;
