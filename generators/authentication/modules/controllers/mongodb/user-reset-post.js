User.findOne({ passwordResetToken: req.params.token })
  .where('passwordResetExpires').gt(Date.now())
  .exec(function(err, user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('back');
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save(function(err) {
      req.logIn(user, function(err) {
        done(err, user);
      });
    });
  });
