
// Sign in with Twitter
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: '/auth/twitter/callback',
  passReqToCallback: true
}, function(req, accessToken, tokenSecret, profile, done) {
  if (req.user) {
    new User({ twitter: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          req.flash('error', { msg: 'There is already an existing account linked with Twitter that belongs to you.' });
          return done(null);
        }
        new User({ id: req.user.id })
          .fetch()
          .then(function(user) {
            user.set('name', user.get('name') || profile.displayName);
            user.set('location', user.get('location') || profile._json.location);
            user.set('picture', user.get('picture') || profile._json.profile_image_url_https);
            user.set('twitter', profile.id);
            user.save(user.changed, { patch: true }).then(function() {
              req.flash('success', { msg: 'Your Twitter account has been linked.' });
              done(null, user);
            });
          });
      });
  } else {
    new User({ twitter: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          return done(null, user);
        }
        // Twitter does not provide an email address, but email is a required field in our User schema.
        // We can "fake" a Twitter email address as follows: username@twitter.com.
        // Ideally, it should be changed by a user to their real email address afterwards.
        // For example, after login, check if email contains @twitter.com, then redirect to My Account page,
        // and restrict user's page navigation until they update their email address.
        user = new User();
        user.set('name', profile.displayName);
        user.set('email', profile.username + '@twitter.com');
        user.set('location', profile._json.location);
        user.set('picture', profile._json.profile_image_url_https);
        user.set('twitter', profile.id);
        user.save().then(function(user) {
          done(null, user);
        });
      });
  }
}));
