new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', Date.now())
  .fetch({ require: true })
  .then(function(user) {
    res.render('account/reset', {
      title: 'Password Reset'
    });
  })
  .catch(function(err) {
    console.log(err);
    req.flash('error', { msg: 'Password reset token is invalid or has expired.' });
    return res.redirect('/forgot');
  });
