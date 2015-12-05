let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateFacebookAuthenticationExpress(params) {
  let config = path.join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = path.join(__base, 'modules', 'authentication', 'facebook', 'passport-require.js');
  let strategy = path.join(__base, 'modules', 'authentication', 'facebook', 'passport-strategy.js');
  let routes = path.join(__base, 'modules', 'authentication', 'facebook', 'passport-routes.js');

  if (params.authentication.includes('facebook')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_FACEBOOK_REQUIRE');
    await removeCode(config, 'PASSPORT_FACEBOOK_STRATEGY');
  }
}

module.exports = generateFacebookAuthenticationExpress;
