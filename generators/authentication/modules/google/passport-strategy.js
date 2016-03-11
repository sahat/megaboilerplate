
// Sign in with Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ google: profile.id }, function(err, user) {
      if (user) {
        req.flash('error', { msg: 'There is an existing Google account that belongs to you. ' +
        'Sign in with that account, or delete it and then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.displayName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || profile._json.image.url;
          user.google = profile.id;
          user.save(function(err) {
            req.flash('info', { msg: 'Your Google account has been linked successfully.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, function(err, user) {
      if (user) {
        return done(null, user);
      }
      User.findOne({ email: profile.emails[0].value }, function(err, user) {
        if (user) {
          req.flash('error', { msg: 'Your email ' + user.email + ' is already associated with an account. ' +
          'Sign in to that account, then link it with Google manually from My Account page.' });
          done(err);
        } else {
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            gender: profile._json.gender,
            location: profile._json.location,
            picture: profile._json.image.url,
            google: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));
