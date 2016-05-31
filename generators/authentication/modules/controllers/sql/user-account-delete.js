new User({ id: req.user.id }).destroy().then(function(user) {
  //= ACCOUNT_DELETE_SUCCESS_INDENT2
});
