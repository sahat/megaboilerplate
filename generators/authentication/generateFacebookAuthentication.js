let generateFacebookAuthenticationExpress = require('./generateFacebookAuthenticationExpress');

async function generateFacebookAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateFacebookAuthenticationExpress(params);
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

module.exports = generateFacebookAuthentication;
