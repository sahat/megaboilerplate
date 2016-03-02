import generateLocalAuthenticationExpress from './generateLocalAuthenticationExpress';

async function generateLocalAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateLocalAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateLocalAuthentication;
