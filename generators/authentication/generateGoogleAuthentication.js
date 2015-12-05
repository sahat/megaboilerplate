let generateGoogleAuthenticationExpress = require('./generateGoogleAuthenticationExpress');

async function generateGoogleAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateGoogleAuthenticationExpress(params);
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

module.exports = generateGoogleAuthentication;
