new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
}).save()
  .then(function(user) {
    //= SIGNUP_SUCCESS_RESPONSE_INDENT4
  })
  .catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
      //= SIGNUP_EMAIL_ALREADY_EXISTS_INDENT4
    }
  });
