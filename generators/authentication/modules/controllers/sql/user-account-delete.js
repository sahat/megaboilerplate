new User({ id: req.user.id }).destroy().then(function(user) {
  req.logout();
  req.flash('info', { msg: 'Your account has been permanently deleted.' });
  res.redirect('/');
});
