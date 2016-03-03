var passport = require('passport');
//= PASSPORT_LOCAL_REQUIRE
//= PASSPORT_FACEBOOK_REQUIRE
//= PASSPORT_GOOGLE_REQUIRE
//= PASSPORT_TWITTER_REQUIRE

//= PASSPORT_USER_MODEL
//= PASSPORT_SERIALIZER
//= PASSPORT_DESERIALIZER

//= PASSPORT_LOCAL_STRATEGY
//= PASSPORT_FACEBOOK_STRATEGY
//= PASSPORT_GOOGLE_STRATEGY
//= PASSPORT_TWITTER_STRATEGY

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
