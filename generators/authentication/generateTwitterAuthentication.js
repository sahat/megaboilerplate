let generateTwitterAuthenticationExpress = require('./generateTwitterAuthenticationExpress');

async function generateTwitterAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateTwitterAuthenticationExpress(params);
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

module.exports = generateTwitterAuthentication;
