new User({ email: req.body.email })
  .fetch()
  .then(function(user) {
    if (!user) {
      req.flash('error', { msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
      return res.redirect('/forgot');
    }
    user.set('passwordResetToken', token);
    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
    user.save(user.changed, { patch: true }).then(function() {
      done(null, token, user.toJSON());
    });
  });
