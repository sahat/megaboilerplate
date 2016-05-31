if (req.isAuthenticated()) {
  User.findOne({ vk: profile.uid }, function(err, user) {
    if (user) {
      return res.status(409).send({ msg: 'There is already an existing account linked with VK that belongs to you.' });
    }
    user = req.user;
    user.name = user.name || profile.first_name + ' ' + profile.last_name;
    user.gender = user.gender || profile.sex === 1 ? 'female' : profile.sex == 2 ? 'male' : undefined;
    user.picture = user.picture || profile.photo;
    user.vk = profile.uid;
    user.save(function() {
      res.send({ token: generateToken(user), user: user });
    });
  });
} else {
  // Step 3b. Create a new user account or return an existing one.
  User.findOne({ vk: profile.uid }, function(err, user) {
    if (user) {
      return res.send({ token: generateToken(user), user: user });
    }
    User.findOne({ email: accessToken.email }, function(err, user) {
      if (user) {
        return res.status(400).send({ msg: user.email + ' is already associated with another account.' })
      }
      user = new User({
        name: profile.first_name + ' ' + profile.last_name,
        email: accessToken.email,
        gender: profile.sex === 1 ? 'female' : profile.sex == 2 ? 'male' : undefined,
        picture: profile.photo,
        vk: profile.uid
      });
      user.save(function(err) {
        return res.send({ token: generateToken(user), user: user });
      });
    });
  });
}
