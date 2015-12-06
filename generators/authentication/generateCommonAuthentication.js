let path = require('path');
let removeCode = require('../../utils/removeCode');
let generateCommonAuthenticationExpress = require('./generateCommonAuthenticationExpress');

async function generateCommonAuthentication(params) {
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

module.exports = generateCommonAuthentication;
