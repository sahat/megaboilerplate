let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));
let replaceCode = require('../../utils/replaceCode');
let removeCode = require('../../utils/removeCode');
let addDependencies = require('../../utils/addDependencies');
let packages = require('../../modules/packages');

async function generateTwitterAuthenticationExpress(params) {
  let config = path.join(__base, 'build', params.uuid, 'config', 'passport.js');
  let require = path.join(__base, 'modules', 'authentication', 'twitter', 'passport-require.js');
  let strategy = path.join(__base, 'modules', 'authentication', 'twitter', 'passport-strategy.js');
  let routes = path.join(__base, 'modules', 'authentication', 'twitter', 'passport-routes.js');

  if (params.authentication.includes('twitter')) {
    // TODO
  } else {
    await removeCode(config, 'PASSPORT_TWITTER_REQUIRE');
    await removeCode(config, 'PASSPORT_TWITTER_STRATEGY');
  }
}

module.exports = generateTwitterAuthenticationExpress;
