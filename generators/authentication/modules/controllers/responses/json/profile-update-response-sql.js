user.fetch().then(function(user) {
  if ('password' in req.body) {
    res.send({ msg: 'Your password has been changed.' });
  } else {
    res.send({ user: user, msg: 'Your profile information has been updated.' });
  }
  res.redirect('/account');
}).catch(function(err) {
  if (err.code === 'ER_DUP_ENTRY') {
    res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
  }
});
