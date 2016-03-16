
// Sign in with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    new User({ google: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          req.flash('error', { msg: 'There is already an existing account linked with Google that belongs to you.' });
          return done(null);
        }
        new User({ id: req.user.id })
          .fetch()
          .then(function(user) {
            user.set('name', user.get('name') || profile.displayName);
            user.set('gender', user.get('gender') || profile._json.gender);
            user.set('picture', user.get('picture') || profile._json.image.url);
            user.set('google', profile.id);
            user.save(user.changed, { patch: true }).then(function() {
              req.flash('success', { msg: 'Your Google account has been linked.' });
              done(null, user);
            });
          });
      });
  } else {
    new User({ google: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          return done(null, user);
        }
        new User({ email: profile.emails[0].value })
          .fetch()
          .then(function(user) {
            if (user) {
              req.flash('error', { msg: user.get('email') + ' is already associated with another account.' });
              return done();
            }
            user = new User();
            user.set('name', profile.displayName);
            user.set('email', profile.emails[0].value);
            user.set('gender', profile._json.gender);
            user.set('location', profile._json.location);
            user.set('picture', profile._json.image.url);
            user.set('google', profile.id);
            user.save().then(function(user) {
              done(null, user);
            });
          });
      });
  }
}));
