function generateToken(user) {
  var payload = {
    iss: 'my.domain.com',
    iat: moment().unix(),
    exp: moment().add(1, 'hour').unix(),
    sub: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    location: user.gender,
    website: user.website,
    picture: user.picture,
    gravatar: user.gravatar,
    facebook: user.facebook,
    twitter: user.twitter,
    google: user.google
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}
