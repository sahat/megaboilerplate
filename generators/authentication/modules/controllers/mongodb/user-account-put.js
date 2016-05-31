User.findById(req.user.id, function(err, user) {
  if ('password' in req.body) {
    user.password = req.body.password;
  } else {
    user.email = req.body.email;
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.location = req.body.location;
    user.website = req.body.website;
  }
  user.save(function(err) {
    //= PROFILE_UPDATE_RESPONSE
  });
});
