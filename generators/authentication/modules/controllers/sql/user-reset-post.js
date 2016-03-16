new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', new Date())
  .fetch()
  .then(function(user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('back');
    }
    user.set('password', req.body.password);
    user.set('passwordResetToken', null);
    user.set('passwordResetExpires', null);
    user.save(user.changed, { patch: true }).then(function() {
      req.logIn(user, function(err) {
        done(err, user.toJSON());
      });
    });
  });
