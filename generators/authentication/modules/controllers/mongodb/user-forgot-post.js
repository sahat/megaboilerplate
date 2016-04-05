User.findOne({ email: req.body.email }, function(err, user) {
  if (!user) {
    //= FORGOT_POST_INVALID_EMAIL_ERROR
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
  user.save(function(err) {
    done(err, token, user);
  });
});
