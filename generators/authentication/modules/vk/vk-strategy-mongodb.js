
// Sign in with VK
passport.use(new VKontakteStrategy({
  clientID: process.env.VKONTAKTE_ID,
  clientSecret: process.env.VKONTAKTE_SECRET,
  callbackURL: '/auth/vkontakte/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, params, profile, done) {
  if (req.user) {
    User.findOne({ vk: profile.id }, function(err, user) {
      if (user) {
        req.flash('error', { msg: 'There is already an existing account linked with VK that belongs to you.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.name = user.name || profile.displayName;
          user.gender = user.gender || profile.gender;
          user.picture = user.picture || profile._json.photo;
          user.vk = profile.id;
          user.save(function(err) {
            req.flash('success', { msg: 'Your VK account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ vk: profile.id }, function(err, user) {
      if (user) {
        return done(err, user);
      }
      User.findOne({ email: params.email }, function(err, user) {
        if (user) {
          req.flash('error', { msg: user.email + ' is already associated with another account.' });
          done(err);
        } else {
          var newUser = new User({
            name: profile.displayName,
            email: params.email,
            gender: profile.gender,
            picture: profile._json.photo,
            vk: profile.id
          });
          newUser.save(function(err) {
            done(err, newUser);
          });
        }
      });
    });
  }
}));
