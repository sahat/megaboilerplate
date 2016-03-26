if (req.isAuthenticated()) {
  User.findOne({ twitter: profile.id }, function(err, user) {
    if (user) {
      return res.status(409).send({ msg: 'There is already an existing account linked with Twitter that belongs to you.' });
    }
    user = req.user;
    user.name = user.name || profile.name;
    user.picture = user.picture || profile.profile_image_url_https;
    user.location = user.location || profile.location;
    user.twitter = profile.id;
    user.save(function(err) {
      res.send({ token: generateToken(user), user: user });
    });
  });
} else {
  // Step 5b. Create a new user account or return an existing one.
  User.findOne({ twitter: profile.id }, function(err, user) {
    if (user) {
      return res.send({ token: generateToken(user), user: user });
    }

    // Twitter does not provide an email address, but email is a required field in our User schema.
    // We can "fake" a Twitter email address as follows: username@twitter.com.
    user = new User({
      name: profile.name,
      email: profile.screen_name + '@twitter.com',
      location: profile.location,
      picture: profile.profile_image_url_https,
      twitter: profile.id
    });
    user.save(function() {
      res.send({ token: generateToken(user), user: user });
    });
  });
}
