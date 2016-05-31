User.findById(payload.sub, function(err, user) {
  req.user = user;
  next();
});
