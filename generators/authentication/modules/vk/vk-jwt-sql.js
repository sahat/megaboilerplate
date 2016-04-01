if (req.isAuthenticated()) {
  new User({ vk: profile.uid })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.status(409).send({ msg: 'There is already an existing account linked with VK that belongs to you.' });
      }
      user = req.user;
      user.set('name', user.get('name') || profile.first_name + ' ' + profile.last_name);
      user.set('gender', user.get('gender') || profile.sex === 1 ? 'female' : profile.sex == 2 ? 'male' : undefined);
      user.set('picture', user.get('picture') || profile.photo);
      user.set('vk', profile.uid);
      user.save(user.changed, { patch: true }).then(function() {
        res.send({ token: generateToken(user), user: user });
      });
    });

} else {
  // Step 3b. Create a new user account or return an existing one.
  new User({ vk: profile.uid })
    .fetch()
    .then(function(user) {
      if (user) {
        return res.send({ token: generateToken(user), user: user });
      }
      new User({ email: accessToken.email })
        .fetch()
        .then(function(user) {
          if (user) {
            return res.status(400).send({ msg: user.get('email') + ' is already associated with another account.' })
          }
          user = new User();
          user.set('name', profile.first_name + ' ' + profile.last_name);
          user.set('email', accessToken.email);
          user.set('gender', profile.sex === 1 ? 'female' : profile.sex == 2 ? 'male' : undefined);
          user.set('picture', profile.photo);
          user.set('vk', profile.uid);
          user.save().then(function(user) {
            return res.send({ token: generateToken(user), user: user });
          });
        });
    });
}
