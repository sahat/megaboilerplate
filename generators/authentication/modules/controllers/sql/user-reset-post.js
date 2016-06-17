new User({ passwordResetToken: req.params.token })
  .where('passwordResetExpires', '>', new Date())
  .fetch()
  .then(function(user) {
    if (!user) {
      //= RESET_POST_INVALID_TOKEN_ERROR_INDENT5
    }
    user.set('password', req.body.password);
    user.set('passwordResetToken', null);
    user.set('passwordResetExpires', null);
    user.save(user.changed, { patch: true }).then(function() {
      //= USER_RESET_POST_SUCCESS_INDENT5
    });
  });
