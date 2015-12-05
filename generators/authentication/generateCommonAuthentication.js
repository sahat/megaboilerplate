let path = require('path');
let removeCode = require('../../utils/removeCode');
let generateCommonAuthenticationExpress = require('./generateCommonAuthenticationExpress');

async function generateCommonAuthentication(params) {
  if (params.authentication.includes('none')) {
    let app = path.join(__base, 'build', params.uuid, 'app.js');
    await removeCode(app, 'PASSPORT_REQUIRE');
    await removeCode(app, 'PASSPORT_MIDDLEWARE');
  } else {
    switch (params.framework) {
      case 'express':
        await generateCommonAuthenticationExpress(params);
        break;
      case 'hapi':
        // TODO
        break;
      case 'sails':
        // TODO
        break;
      default:
        // TODO
    }
  }
}

module.exports = generateCommonAuthentication;
