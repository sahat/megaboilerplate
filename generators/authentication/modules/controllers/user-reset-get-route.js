
/**
 * GET /reset
 */
exports.resetGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  //= USER_RESET_GET
};
