User.findOne({ email: req.body.email }, function(err, user) {
  if (!user) {
    req.flash('error', { msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
    return res.redirect('/forgot');
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
  user.save(function(err) {
    done(err, token, user);
  });
});
