new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
}).save()
  .then(function(user) {
    req.logIn(user, function(err) {
      res.redirect('/');
    });
  })
  .catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      req.flash('error', { msg: 'The email address you have entered is already associated with an account.' });
      return res.redirect('/signup');
    }
  });
