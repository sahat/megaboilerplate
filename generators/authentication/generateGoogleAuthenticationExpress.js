let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateGoogleAuthenticationExpress(params) {
  let config = path.join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = path.join(__base, 'modules', 'authentication', 'google', 'passport-require.js');
  let strategy = path.join(__base, 'modules', 'authentication', 'google', 'passport-strategy.js');
  let routes = path.join(__base, 'modules', 'authentication', 'google', 'passport-routes.js');

  if (params.authentication.includes('google')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_GOOGLE_REQUIRE');
    await removeCode(config, 'PASSPORT_GOOGLE_STRATEGY');
  }
}

module.exports = generateGoogleAuthenticationExpress;
