new User({ email: req.body.email })
  .fetch()
  .then(function(user) {
    if (!user) {
      req.flash('error', { msg: 'The email address ' + req.body.email +
      ' is not associated with any account. Double-check your email address and try again.' });
      return res.redirect('/forgot');
    }
    user.save({ passwordResetToken: token, passwordResetExpires: Date.now() + 3600000 }, { patch: true })
      .then(function() {
        done(null, token, user.toJSON());
      });
  });
