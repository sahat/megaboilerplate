
// Sign in with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    new User({ facebook: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          req.flash('error', {
            msg: 'There is an existing Facebook account that belongs to you. ' +
            'Sign in with that account, or delete it and then link it with your current account.'
          });
          return done(null);
        }
        new User({ id: req.user.id })
          .save({
            name: user.name || profile.displayName,
            gender: user.gender || profile._json.gender,
            picture: user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
            facebook: profile.id
          }, { patch: true })
          .then(function() {
            req.flash('info', { msg: 'Your Facebook account has been linked successfully.' });
            done(null, user);
          });
      });
  } else {
    new User({ facebook: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          return done(null, user);
        }
        new User({ email: profile._json.email })
          .fetch()
          .then(function(user) {
            if (user) {
              req.flash('error', { msg: 'Your email ' + user.email + ' is already associated with an account. ' +
                'Sign in to that account, then link it with Facebook manually from My Account page.' });
              return done();
            }
            new User({
              name: profile.displayName,
              email: profile._json.email,
              gender: profile._json.gender,
              location: profile._json.location,
              picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
              facebook: profile.id
            })
              .save()
              .then(function(user) {
                done(null, user);
              });
          });
      });
  }
}));
