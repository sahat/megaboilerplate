if (req.isAuthenticated()) {
  new User({ facebook: profile.id })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
      }
      user = req.user;
      user.set('name', user.get('name') || profile.name);
      user.set('gender', user.get('gender') || profile.gender);
      user.set('picture', user.get('picture') || 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
      user.set('facebook', profile.id);
      user.save(user.changed, { patch: true }).then(function() {
        res.send({ token: generateToken(user), user: user });
      });
    });
} else {
  // Step 3b. Create a new user account or return an existing one.
  new User({ facebook: profile.id })
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
          user.set('location', profile.location && profile.location.name);
          user.set('picture', 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
          user.set('facebook', profile.id);
          user.save().then(function(user) {
            return res.send({ token: generateToken(user), user: user });
          });
        });
    });
}
