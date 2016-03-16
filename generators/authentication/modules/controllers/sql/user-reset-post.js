new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', Date.now())
  .fetch()
  .then(function(user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('back');
    }
    user.save({ password: req.body.password, passwordResetToken: null, passwordResetExpires: null }, { patch: true })
      .then(function() {
        req.logIn(user, function(err) {
          done(err, user);
        });
      });
  });
