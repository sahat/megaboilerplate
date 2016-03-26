new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
}).save()
  .then(function(user) {
    //= SIGNUP_SUCCESS_RESPONSE
  })
  .catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      //= SIGNUP_EMAIL_ALREADY_EXISTS
    }
  });
