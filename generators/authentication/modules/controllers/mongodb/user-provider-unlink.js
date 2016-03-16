User.findById(req.user.id, function(err, user) {
  if (err) {
    return next(err);
  }
  user[provider] = undefined;
  user.tokens = _.reject(user.tokens, function(token) { return token.kind === provider; });
  user.save(function(err) {
    if (err) return next(err);
    req.flash('info', { msg: provider + ' account has been unlinked.' });
    res.redirect('/account');
  });
});
