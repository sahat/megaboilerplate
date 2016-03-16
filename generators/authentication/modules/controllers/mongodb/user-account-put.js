User.findById(req.user.id, function(err, user) {
  if ('password' in req.body) {
    user.password = req.body.password;
  } else {
    user.email = req.body.email;
    user.name = req.body.name;
    user.gender = req.body.gender;
    user.location = req.body.location;
    user.website = req.body.website;
  }
  user.save(function(err) {
    if ('password' in req.body) {
      req.flash('success', { msg: 'Your password has been changed.' });
    } else if (err && err.code === 11000) {
      req.flash('error', { msg: 'The email address you have entered is already associated with an account.' });
    } else {
      req.flash('success', { msg: 'Your profile information has been updated.' });
    }
    res.redirect('/account');
  });
});
