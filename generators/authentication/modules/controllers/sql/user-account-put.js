var user = new User({ id: req.user.id });

if ('password' in req.body) {
  user.save({ password: req.body.password }, { patch: true });
} else {
  user.save({
    email: req.body.email,
    name: req.body.name,
    gender: req.body.gender,
    location: req.body.location,
    website: req.body.website
  }, { patch: true });
}

user
  .then(function(user) {
    if ('password' in req.body) {
      req.flash('success', { msg: 'Your password has been changed.' });
    } else {
      req.flash('success', { msg: 'Your profile information has been updated.' });
    }
    res.redirect('/account');
  })
  .catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      req.flash('error', { msg: 'The email address you have entered is already associated with an account.' });
    }
  });
