
exports.isAuthenticated = function(req, res, next) {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.TOKEN_SECRET, function(err) {
    if (err) {
      return res.status(401).send({ msg: err.message });
    }
    User.findById(payload.sub, '-password', function(err, user) {
      req.user = user;
      next();
    });
  });
};
