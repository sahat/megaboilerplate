
// Sign in with Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'gender', 'location'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ facebook: profile.id }, function(err, user) {
      if (user) {
        req.flash('error', { msg: 'There is already an existing account linked with Facebook that belongs to you.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.name.givenName + ' ' + profile.name.familyName;
          user.gender = user.gender || profile._json.gender;
          user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.facebook = profile.id;
          user.save(function(err) {
            req.flash('success', { msg: 'Your Facebook account has been linked.' });
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
          req.flash('error', { msg: user.email + ' is already associated with another account.' });
          done(err);
        } else {
          var newUser = new User({
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile._json.email,
            gender: profile._json.gender,
            location: profile._json.location && profile._json.location.name,
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
