
// Sign in with VK
passport.use(new VKontakteStrategy({
  clientID: process.env.VKONTAKTE_ID,
  clientSecret: process.env.VKONTAKTE_SECRET,
  callbackURL: '/auth/vkontakte/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, params, profile, done) {
  if (req.user) {
    new User({ vk: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          req.flash('error', { msg: 'There is already an existing account linked with VK that belongs to you.' });
          return done(null);
        }
        new User({ id: req.user.id })
          .fetch()
          .then(function(user) {
            user.set('name', user.get('name') || profile.displayName);
            user.set('gender', user.get('gender') || profile.gender);
            user.set('picture', user.get('picture') || profile._json.photo);
            user.set('vk', profile.id);
            user.save(user.changed, { patch: true }).then(function() {
              req.flash('success', { msg: 'Your VK account has been linked.' });
              done(null, user);
            });
          });
      });
  } else {
    new User({ vk: profile.id })
      .fetch()
      .then(function(user) {
        if (user) {
          return done(null, user);
        }
        new User({ email: params.email })
          .fetch()
          .then(function(user) {
            if (user) {
              req.flash('error', { msg: user.get('email') + ' is already associated with another account.' });
              return done();
            }
            user = new User();
            user.set('name', profile.displayName);
            user.set('email', params.email);
            user.set('gender', profile.gender);
            user.set('picture', profile._json.photo);
            user.set('vk', profile.id);
            user.save().then(function(user) {
              done(null, user);
            });
          });
      });
  }
}));
