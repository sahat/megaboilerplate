user.then(function(user) {
  if ('password' in req.body) {
    req.flash('success', { msg: 'Your password has been changed.' });
  } else {
    req.flash('success', { msg: 'Your profile information has been updated.' });
  }
  res.redirect('/account');
}).catch(function(err) {
  if (err.code === 'ER_DUP_ENTRY') {
    req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
  }
});
