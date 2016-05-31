import generateVkAuthenticationExpress from './generateVkAuthenticationExpress';

async function generateVkAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateVkAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateVkAuthentication;
