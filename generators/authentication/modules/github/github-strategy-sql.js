
// Sign in with Github
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    new User({ github: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          req.flash('error', { msg: 'There is already an existing account linked with Github that belongs to you.' });
          return done(null);
        }
        new User({ id: req.user.id })
          .fetch()
          .then(function(user) {
            user.set('name', user.get('name') || profile.displayName);
            user.set('picture', user.get('picture') || profile._json.avatar_url);
            user.set('github', profile.id);
            user.save(user.changed, { patch: true }).then(function() {
              req.flash('success', { msg: 'Your Github account has been linked.' });
              done(null, user);
            });
          });
      });
  } else {
    new User({ github: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          return done(null, user);
        }
        new User({ email: profile.email })
          .fetch()
          .then(function(user) {
            if (user) {
              req.flash('error', { msg: user.get('email') + ' is already associated with another account.' });
              return done();
            }
            user = new User();
            user.set('name', profile.displayName);
            user.set('email', profile.email);
            user.set('location', profile._json.location);
            user.set('picture', profile._json.avatar_url);
            user.set('github', profile.id);
            user.save().then(function(user) {
              done(null, user);
            });
          });
      });
  }
}));
