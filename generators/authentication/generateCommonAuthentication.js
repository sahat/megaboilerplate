import generateCommonAuthenticationExpress from './generateCommonAuthenticationExpress';

export default async function generateCommonAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateCommonAuthenticationExpress(params);
      break;
    case 'meteor':
      break;
    default:
  }
}
