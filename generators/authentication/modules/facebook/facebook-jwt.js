/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
exports.authFacebook = function(req, res) {
  var profileFields = ['id', 'name', 'email', 'gender', 'location'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (accessToken.error) {
      return res.status(500).send({ msg: accessToken.error.message });
    }

    // Step 2. Retrieve user's profile information.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ msg: profile.error.message });
      }

      // Step 3a. Link accounts if user is authenticated.
      if (req.headers.authorization) {
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            return res.status(409).send({ msg: 'There is already an existing account linked with Facebook that belongs to you.' });
          }
          var token = req.headers.authorization.split(' ')[1];
          jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload) {
            if (err) {
              return res.status(401).send({ msg: err.message });
            }
            User.findById(payload.sub, function(err, user) {
              user.name = user.name || profile.name;
              user.gender = user.gender || profile.gender;
              user.picture = user.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
              user.facebook = profile.id;
              user.save(function() {
                var token = generateToken(user);
                res.send({ token: token, user: user });
              });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ facebook: profile.id }, function(err, user) {
          if (user) {
            var token = generateToken(user);
            return res.send({ token: token, user: user });
          }
          User.findOne({ email: profile.email }, function(err, user) {
            if (user) {
              return res.status(400).send({ msg: user.email + ' is already associated with another account.' })
            }
            var newUser = new User({
              name: profile.name,
              email: profile.email,
              gender: profile.gender,
              location: profile.location.name,
              picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large',
              facebook: profile.id
            });
            newUser.save(function(err) {
              var token = generateToken(newUser);
              return res.send({ token: token, user: newUser });
            });
          });
        });
      }
    });
  });
};
