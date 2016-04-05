if (req.isAuthenticated()) {
  User.findOne({ facebook: profile.id }, function(err, user) {
    if (user) {
      return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
    }
    user = req.user;
    user.name = user.name || profile.name;
    user.gender = user.gender || profile.gender;
    user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
    user.facebook = profile.id;
    user.save(function() {
      res.send({ token: generateToken(user), user: user });
    });
  });
} else {
  // Step 3b. Create a new user account or return an existing one.
  User.findOne({ facebook: profile.id }, function(err, user) {
    if (user) {
      return res.send({ token: generateToken(user), user: user });
    }
    User.findOne({ email: profile.email }, function(err, user) {
      if (user) {
        return res.status(400).send({ msg: user.email + ' is already associated with another account.' })
      }
      user = new User({
        name: profile.name,
        email: profile.email,
        gender: profile.gender,
        location: profile.location && profile.location.name,
        picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
        facebook: profile.id
      });
      user.save(function(err) {
        return res.send({ token: generateToken(user), user: user });
      });
    });
  });
}
