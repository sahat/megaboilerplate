function generateToken(user) {
  var payload = {
    sub: user.id,
    exp: moment().add(1, 'hour').unix(),
    iat: moment().unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}
