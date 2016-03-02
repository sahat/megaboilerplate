app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
