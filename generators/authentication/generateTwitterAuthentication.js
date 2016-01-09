import generateTwitterAuthenticationExpress from './generateTwitterAuthenticationExpress';

async function generateTwitterAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateTwitterAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateTwitterAuthentication;
