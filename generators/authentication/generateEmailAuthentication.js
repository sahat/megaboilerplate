import generateEmailAuthenticationExpress from './generateEmailAuthenticationExpress';

async function generateEmailAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateEmailAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateEmailAuthentication;
