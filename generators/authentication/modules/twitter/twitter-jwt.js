/**
 * POST /auth/twitter
 * Sign in with Twitter
 */
exports.authTwitter = function(req, res) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

  // Part 1 of 2: Initial POST request to obtain OAuth request token.
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      callback: req.body.redirectUri
    };

    // Step 1. Obtain request token to initiate app authorization.
    // At this point nothing is happening inside a popup yet.
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = qs.parse(body);

      // Step 2. Send OAuth token back.
      // After request token is sent back, a popup will redirect to the Twitter app authorization screen.
      // Unlike Facebook and Google (OAuth 2.0), we have to do this extra step for Twitter (OAuth 1.0).
      res.send(oauthToken);
    });
  } else {
    // Part 2 of 2: Second POST request after "Authorize app" button is clicked.
    var accessTokenOauth = {
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    // Step 3. Exchange "oauth token" and "oauth verifier" for access token.
    // It is similar to exchanging "code" for access token in OAuth 2.0
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      accessToken = qs.parse(accessToken);

      var profileOauth = {
        consumer_key: process.env.TWITTER_KEY,
        consumer_secret: process.env.TWITTER_SECRET,
        oauth_token: accessToken.oauth_token
      };

      // Step 4. Retrieve user's profile information.
      request.get({ url: profileUrl + accessToken.screen_name, oauth: profileOauth, json: true }, function(err, response, profile) {

        // Step 5a. Link accounts if user is authenticated.
        if (req.headers.authorization) {
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({ msg: 'There is already an existing account linked with Twitter that belongs to you.' });
            }

            var token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload) {
              if (err) {
                return res.status(401).send({ msg: err.message });
              }
              User.findById(payload.sub, function(err, user) {
                user.name = user.name || profile.name;
                user.picture = user.picture || profile.profile_image_url_https;
                user.location = user.location || profile.location;
                user.twitter = profile.id;
                user.save(function(err) {
                  var token = generateToken(user);
                  res.send({ token: token, user: user });
                });
              });
            });
          });
        } else {
          // Step 5b. Create a new user account or return an existing one.
          User.findOne({ twitter: profile.id }, function(err, existingUser) {
            if (existingUser) {
              var token = generateToken(user);
              return res.send({ token: token, user: existingUser });
            }

            // Twitter does not provide an email address, but email is a required field in our User schema.
            // We can "fake" a Twitter email address as follows: username@twitter.com.
            // Ideally, it should be changed by a user to their real email address afterwards.
            // For example, after login, check if email contains @twitter.com, then redirect to My Account page,
            // and restrict user's page navigation until they update their email address.
            var user = new User({
              name: profile.name,
              email: profile.screen_name + '@twitter.com',
              location: profile.location,
              picture: profile.profile_image_url_https,
              twitter: profile.id
            });
            user.save(function() {
              res.send({ token: generateToken(user), user: user });
            });
          });
        }
      });
    });
  }
};
