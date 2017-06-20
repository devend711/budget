var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    const searchQuery = {
      name: profile.displayName
    };

    const updates = {
      name: profile.displayName,
      someID: profile.id
    };

    const options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
));

init();

module.exports = passport;
