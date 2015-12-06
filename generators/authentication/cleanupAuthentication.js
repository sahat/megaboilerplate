let path = require('path');
let removeCode = require('../../utils/removeCode');

async function cleanupAuthentication(params) {
  switch (params.framework) {
    case 'express':
      let app = path.join(__base, 'build', params.uuid, 'app.js');
      await removeCode(app, 'PASSPORT_REQUIRE');
      await removeCode(app, 'PASSPORT_MIDDLEWARE');
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

module.exports = cleanupAuthentication;

