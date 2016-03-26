if (req.isAuthenticated()) {
  User.findOne({ google: profile.sub }, function(err, user) {
    if (user) {
      return res.status(409).send({ msg: 'There is already an existing account linked with Google that belongs to you.' });
    }
    user = req.user;
    user.name = user.name || profile.name;
    user.gender = profile.gender;
    user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
    user.location = user.location || profile.location;
    user.google = profile.sub;
    user.save(function() {
      res.send({ token: generateToken(user), user: user });
    });
  });
} else {
  // Step 3b. Create a new user account or return an existing one.
  User.findOne({ google: profile.sub }, function(err, user) {
    if (user) {
      return res.send({ token: generateToken(user), user: user });
    }
    user = new User({
      name: profile.name,
      email: profile.email,
      gender: profile.gender,
      picture: profile.picture.replace('sz=50', 'sz=200'),
      location: profile.location,
      google: profile.sub
    });
    user.save(function(err) {
      res.send({ token: generateToken(user), user: user });
    });
  });
}
