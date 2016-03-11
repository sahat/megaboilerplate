
// Sign in with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ facebook: profile.id }, function(err, user) {
      if (user) {
        req.flash('error', { msg: 'There is an existing Facebook account that belongs to you. ' +
        'Sign in with that account, or delete it and then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.displayName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook = profile.id;
          user.save(function(err) {
            req.flash('info', { msg: 'Your Facebook account has been linked successfully.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, function(err, user) {
      if (user) {
        return done(err, user);
      }
      User.findOne({ email: profile._json.email }, function(err, user) {
        if (user) {
          req.flash('error', { msg: 'Your email ' + user.email + ' is already associated with an account. ' +
          'Sign in to that account, then link it with Facebook manually from My Account page.' });
          done(err);
        } else {
          var newUser = new User({
            name: profile.displayName,
            email: profile._json.email,
            gender: profile._json.gender,
            location: profile._json.location,
            picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
            facebook: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));
