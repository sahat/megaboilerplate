/**
 * GET /account
 */
exports.accountGet = function(req, res) {
  res.render('account/profile', {
    title: 'My Account'
  });
};
