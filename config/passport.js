const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs')

module.exports = function(passport){


  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'You Been Drinking Again! Incorrect Username.' });
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {


        if (err) {
                throw err;
              }
              if (isMatch) {
                return done(null, user)

              } else {
                return done(null, false, {message: "Password Did Not Match"})
              }
   })

      });
    }
  ));


}

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

// }
