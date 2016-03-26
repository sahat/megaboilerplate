
User.findOne({ email: req.body.email }, function(err, user) {
  if (user) {
    //= SIGNUP_EMAIL_ALREADY_EXISTS
  }
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err) {
    //= SIGNUP_SUCCESS_RESPONSE
  });
});
