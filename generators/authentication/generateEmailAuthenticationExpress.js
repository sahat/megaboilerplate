let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateEmailAuthenticationExpress(params) {
  let config = path.join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = path.join(__base, 'modules', 'authentication', 'email', 'passport-require.js');
  let strategy = path.join(__base, 'modules', 'authentication', 'email', 'passport-strategy.js');
  let routes = path.join(__base, 'modules', 'authentication', 'email', 'passport-routes.js');

  if (params.authentication.includes('email')) {
    await addDependencies(packages.authentication.email, params);
    await replaceCode(config, 'PASSPORT_LOCAL_REQUIRE', require);
    await replaceCode(config, 'PASSPORT_LOCAL_STRATEGY', strategy);
  } else {
    await removeCode(config, 'PASSPORT_LOCAL_REQUIRE');
    await removeCode(config, 'PASSPORT_LOCAL_STRATEGY');
  }
}

module.exports = generateEmailAuthenticationExpress;
