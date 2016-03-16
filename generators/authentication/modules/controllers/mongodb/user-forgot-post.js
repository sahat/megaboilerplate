User.findOne({ email: req.body.email }, function(err, user) {
  if (!user) {
    req.flash('error', { msg: 'The email address ' + req.body.email +
    ' is not associated with any account. Double-check your email address and try again.' });
    return res.redirect('/forgot');
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // 1 hour
  user.save(function(err) {
    done(err, token, user);
  });
});
