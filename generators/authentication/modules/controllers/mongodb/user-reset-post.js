User.findOne({ passwordResetToken: req.params.token })
  .where('passwordResetExpires').gt(Date.now())
  .exec(function(err, user) {
    if (!user) {
      //= RESET_POST_INVALID_TOKEN_ERROR_INDENT6
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save(function(err) {
      //= USER_RESET_POST_SUCCESS_INDENT6
    });
  });
