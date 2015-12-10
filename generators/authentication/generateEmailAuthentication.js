let generateEmailAuthenticationExpress = require('./generateEmailAuthenticationExpress');

function generateEmailAuthentication(params) {
  switch (params.framework) {
    case 'express':
      return generateEmailAuthenticationExpress(params);
      break;
    case 'hapi':
      // TODO
      break;
    case 'sails':
      // TODO
      break;
    default:
      return Promise.reject('Unsupported Framework');
  }
}

module.exports = generateEmailAuthentication;
