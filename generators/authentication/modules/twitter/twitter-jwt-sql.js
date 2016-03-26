if (req.isAuthenticated()) {
  new User({ twitter: profile.id })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.status(409).send({ msg: 'There is already an existing account linked with Twitter that belongs to you.' });
      }
      user = req.user;
      user.set('name', user.get('name') || profile.name);
      user.set('location', user.get('location') || profile.location);
      user.set('picture', user.get('picture') || profile.profile_image_url_https);
      user.set('twitter', profile.id);
      user.save(user.changed, { patch: true }).then(function() {
        res.send({ token: generateToken(user), user: user });
      });
    });
} else {
  // Step 5b. Create a new user account or return an existing one.
  new User({ twitter: profile.id })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.send({ token: generateToken(user), user: user });
      }
      // Twitter does not provide an email address, but email is a required field in our User schema.
      // We can "fake" a Twitter email address as follows: username@twitter.com.
      user = new User();
      user.set('name', profile.name);
      user.set('email', profile.username + '@twitter.com');
      user.set('location', profile.location);
      user.set('picture', profile.profile_image_url_https);
      user.set('twitter', profile.id);
      user.save().then(function(user) {
        res.send({ token: generateToken(user), user: user });
      });
    });
}
