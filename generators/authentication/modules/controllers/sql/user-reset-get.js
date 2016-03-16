new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', new Date())
  .fetch()
  .then(function(user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      title: 'Password Reset'
    });
  });
