import generateGithubAuthenticationExpress from './generateGithubAuthenticationExpress';

async function generateGithubAuthentication(params) {
  switch (params.framework) {
    case 'express':
      await generateGithubAuthenticationExpress(params);
      break;
    case 'hapi':
      break;
    case 'meteor':
      break;
    default:
  }
}

export default generateGithubAuthentication;
