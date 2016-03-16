var newUser = new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
});
//_
User.findOne({ email: req.body.email }, function(err, user) {
  if (user) {
    req.flash('error', { msg: 'The email address you have entered is already associated with an account.' });
    return res.redirect('/signup');
  }
  newUser.save(function(err) {
    req.logIn(newUser, function(err) {
      res.redirect('/');
    });
  });
});
