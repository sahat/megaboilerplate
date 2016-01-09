let generateCommonAuthenticationExpress = require('./generateCommonAuthenticationExpress');

async function generateCommonAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateCommonAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateCommonAuthentication;
