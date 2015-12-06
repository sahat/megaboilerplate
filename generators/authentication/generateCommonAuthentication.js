let path = require('path');
let removeCode = require('../../utils/removeCode');
let generateCommonAuthenticationExpress = require('./generateCommonAuthenticationExpress');
let cleanupAuthentication = require('./cleanupAuthentication');

async function generateCommonAuthentication(params) {
  if (params.authentication.length) {
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
  } else {
    await cleanupAuthentication(params);
  }
}

module.exports = generateCommonAuthentication;
