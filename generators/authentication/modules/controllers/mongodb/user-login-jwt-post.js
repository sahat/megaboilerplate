
/**
 * POST /login
 * Sign in with email and password
 */
exports.loginPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });
  //_
  var errors = req.validationErrors();
  //_
  if (errors) {
    return res.status(400).send(errors);
  }
  //_
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
      'Double-check your email address and try again.'
      });
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ msg: 'Invalid email or password' });
      }
      res.send({ token: generateToken(user), user: user.toJSON() });
    });
  });
};
