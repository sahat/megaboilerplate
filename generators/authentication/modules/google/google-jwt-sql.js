if (req.isAuthenticated()) {
  new User({ google: profile.sub })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.status(409).send({ msg: 'There is already an existing account linked with Google that belongs to you.' });
      }
      user = req.user;
      user.set('name', user.get('name') || profile.name);
      user.set('gender', user.get('gender') || profile.gender);
      user.set('picture', user.get('picture') || profile.picture.replace('sz=50', 'sz=200'));
      user.set('location', user.get('location') || profile.location);
      user.set('google', profile.sub);
      user.save(user.changed, { patch: true }).then(function() {
        res.send({ token: generateToken(user), user: user });
      });
    });
} else {
  // Step 3b. Create a new user account or return an existing one.
  new User({ google: profile.sub })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.send({ token: generateToken(user), user: user });
      }
      new User({ email: profile.email })
        .fetch()
        .then(function(user) {
          if (user) {
            return res.status(400).send({ msg: user.get('email') + ' is already associated with another account.' })
          }
          user = new User();
          user.set('name', profile.name);
          user.set('email', profile.email);
          user.set('gender', profile.gender);
          user.set('location', profile.location);
          user.set('picture', profile.picture.replace('sz=50', 'sz=200'));
          user.set('google', profile.sub);
          user.save().then(function(user) {
            res.send({ token: generateToken(user), user: user });
          });
        });
    });
}
