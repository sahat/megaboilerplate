new User({ id: req.user.id })
  .fetch()
  .then(function(user) {
    switch (req.params.provider) {
      case 'facebook':
        user.set('facebook', null);
        break;
      case 'google':
        user.set('google', null);
        break;
      case 'twitter':
        user.set('twitter', null);
        break;
      default:
        req.flash('error', { msg: 'Invalid OAuth Provider' });
        return res.redirect('/account');
    }
    user.save().then(function() {
      req.flash('success', { msg: 'Your account has been unlinked.' });
      res.redirect('/account');
    });
  });
