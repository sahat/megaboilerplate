if (req.isAuthenticated()) {
  User.findOne({ github: profile.id }, function(err, user) {
    if (user) {
      return res.status(409).send({ msg: 'There is already an existing account linked with Github that belongs to you.' });
    }
    user = req.user;
    user.name = user.name || profile.name;
    user.picture = user.picture || profile.avatar_url;
    user.location = user.location || profile.location;
    user.github = profile.id;
    user.save(function() {
      res.send({ token: generateToken(user), user: user });
    });
  });
} else {
  // Step 3b. Create a new user account or return an existing one.
  User.findOne({ github: profile.id }, function(err, user) {
    if (user) {
      return res.send({ token: generateToken(user), user: user });
    }
    user = new User({
      name: profile.name,
      email: profile.email,
      picture: profile.avatar_url,
      location: profile.location,
      github: profile.id
    });
    user.save(function(err) {
      res.send({ token: generateToken(user), user: user });
    });
  });
}
