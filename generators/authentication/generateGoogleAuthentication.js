import generateGoogleAuthenticationExpress from './generateGoogleAuthenticationExpress';

async function generateGoogleAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateGoogleAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateGoogleAuthentication;
