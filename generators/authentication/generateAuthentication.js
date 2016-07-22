import generateCommonAuthentication from './generateCommonAuthentication';
import generateLocalAuthentication from './generateLocalAuthentication';
import generateFacebookAuthentication from './generateFacebookAuthentication';
import generateGoogleAuthentication from './generateGoogleAuthentication';
import generateTwitterAuthentication from './generateTwitterAuthentication';
import generateVkAuthentication from './generateVkAuthentication';
import generateGithubAuthentication from './generateGithubAuthentication';

export default async function generateAuthentication(params) {
  if (params.authentication.length) {
    await generateCommonAuthentication(params);

    if (params.authentication.includes('email')) {
      await generateLocalAuthentication(params);
    }

    if (params.authentication.includes('facebook')) {
      await generateFacebookAuthentication(params);
    }

    if (params.authentication.includes('google')) {
      await generateGoogleAuthentication(params);
    }

    if (params.authentication.includes('twitter')) {
      await generateTwitterAuthentication(params);
    }

    if (params.authentication.includes('vk')) {
      await generateVkAuthentication(params);
    }

    if (params.authentication.includes('github')) {
      await generateGithubAuthentication(params);
    }    
  }
}
