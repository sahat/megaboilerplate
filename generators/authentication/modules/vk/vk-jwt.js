/**
 * POST /auth/vkontakte
 * Sign in with VK
 */
exports.authVkontakte = function(req, res) {
  var profileFields = ['uid', 'first_name', 'last_name', 'screen_name', 'sex', 'photo'];
  var accessTokenUrl = 'https://oauth.vk.com/access_token';
  var profileUrl = 'https://api.vk.com/method/getProfiles?fields=' + profileFields.join(',');

  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: process.env.VKONTAKTE_SECRET,
    redirect_uri: req.body.redirectUri
  };

  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (accessToken.error) {
      return res.status(500).send({ msg: accessToken.error.message });
    }

    var profileUrlParams = {
      access_token: accessToken.access_token,
      uid: accessToken.user_id
    };

    // Step 2. Retrieve user's profile information.
    request.get({ url: profileUrl, qs: profileUrlParams, json: true }, function(err, response, profile) {
      if (profile.error) {
        return res.status(500).send({ msg: profile.error.message });
      }

      profile = profile.response[0];

      // Step 3a. Link accounts if user is authenticated.
      //= AUTH_VK_JWT_DB
    });
  });
};

exports.authVkontakteCallback = function(req, res) {
  //= AUTH_JWT_CALLBACK_INDENT1
};
