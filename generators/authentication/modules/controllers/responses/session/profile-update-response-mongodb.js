if ('password' in req.body) {
  req.flash('success', { msg: 'Your password has been changed.' });
} else if (err && err.code === 11000) {
  req.flash('error', { msg: 'The email address you have entered is already associated with another account.' });
} else {
  req.flash('success', { msg: 'Your profile information has been updated.' });
}
res.redirect('/account');
