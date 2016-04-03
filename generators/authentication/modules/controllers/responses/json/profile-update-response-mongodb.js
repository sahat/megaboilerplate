if ('password' in req.body) {
  res.send({ msg: 'Your password has been changed.' });
} else if (err && err.code === 11000) {
  res.status(409).send({ msg: 'The email address you have entered is already associated with another account.' });
} else {
  res.send({ user: user, msg: 'Your profile information has been updated.' });
}
