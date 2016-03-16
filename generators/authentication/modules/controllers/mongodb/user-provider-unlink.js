User.findById(req.user.id, function(err, user) {
  switch (req.params.provider) {
    case 'facebook':
      user.facebook = undefined;
      break;
    case 'google':
      user.google = undefined;
      break;
    case 'twitter':
      user.twitter = undefined;
      break;
    default:
      req.flash('error', { msg: 'Invalid OAuth Provider' });
      return res.redirect('/account');
  }
  user.save(function(err) {
    req.flash('success', { msg: 'Your account has been unlinked.' });
    res.redirect('/account');
  });
});
