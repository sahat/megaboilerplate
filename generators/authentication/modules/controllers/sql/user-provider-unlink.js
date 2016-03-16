var user = new User({ id: req.user.id });

switch (req.params.provider) {
  case 'facebook':
    user.save({ facebook: null }, { patch: true });
    break;
  case 'google':
    user.save({ google: null }, { patch: true });
    break;
  case 'twitter':
    user.save({ twitter: null }, { patch: true });
    break;
  default:
    req.flash('info', { msg: 'Your account has been permanently deleted.' });
    return res.redirect('/');
}

user.then(function(user) {
  req.flash('info', { msg: 'Account has been unlinked' });
  res.redirect('/account');
});
