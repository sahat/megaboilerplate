new User({ id: payload.sub })
  .fetch()
  .then(function(user) {
    req.user = user;
    next();
  });
