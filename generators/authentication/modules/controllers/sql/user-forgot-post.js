new User({ email: req.body.email })
  .fetch()
  .then(function(user) {
    if (!user) {
      //= FORGOT_POST_INVALID_EMAIL_ERROR_INDENT4
    }
    user.set('passwordResetToken', token);
    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
    user.save(user.changed, { patch: true }).then(function() {
      done(null, token, user.toJSON());
    });
  });
