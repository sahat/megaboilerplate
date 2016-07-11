/**
 * POST /auth/google
 * Sign in with Github
 */
exports.authGithub = function(req, res) {
  var accessTokenUrl = 'https://github.com/login/oauth/access_token';
  var userUrl = 'https://api.github.com/user';

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { 
        Authorization: 'Bearer ' + accessToken,
        'User-Agent': 'MegaBoilerplate'
      };
    // Step 2. Retrieve user's profile information.
    request.get({ url: userUrl, headers: headers, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ message: profile.error.message });
      }
      // Step 3a. Link accounts if user is authenticated.
      //= AUTH_GITHUB_JWT_DB
    });
  });
};

exports.authGithubCallback = function(req, res) {
  //= AUTH_JWT_CALLBACK_INDENT1
};
