User.findOne({ passwordResetToken: req.params.token })
  .where('passwordResetExpires').gt(Date.now())
  .exec(function(err, user) {
    if (!user) {
      req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot');
    }
    res.render('account/reset', {
      title: 'Password Reset'
    });
  });
