var user = new User({ id: req.user.id });

if ('password' in req.body) {
  user.save({ password: req.body.password }, { patch: true });
} else {
  user.save({
    email: req.body.email,
    name: req.body.name,
    gender: req.body.gender,
    location: req.body.location,
    website: req.body.website
  }, { patch: true });
}

//= PROFILE_UPDATE_RESPONSE
