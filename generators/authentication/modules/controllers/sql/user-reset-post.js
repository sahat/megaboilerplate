new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', Date.now())
  .save({
    password: req.body.password,
    passwordResetToken: null,
    passwordResetExpires: null
  }, {
    require: true,
    patch: true
  })
  .then(function(user) {
    req.logIn(user, function(err) {
      done(err, user);
    });
  })
  .catch(function(err) {
    console.log(err);
    req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
    return res.redirect('back');
  });
