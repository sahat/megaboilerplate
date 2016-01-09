import generateFacebookAuthenticationExpress from './generateFacebookAuthenticationExpress';

async function generateFacebookAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateFacebookAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateFacebookAuthentication;
