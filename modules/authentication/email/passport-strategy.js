passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, 'Incorrect username or password.');
      }
      if (!user.validPassword(password)) {
        return done(null, false, 'Incorrect password or password.');
      }
      return done(null, user);
    });
  }
));
