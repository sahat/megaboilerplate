import generateCommonAuthentication from './generateCommonAuthentication';
import generateEmailAuthentication from './generateEmailAuthentication';
import generateFacebookAuthentication from './generateFacebookAuthentication';
import generateGoogleAuthentication from './generateGoogleAuthentication';
import generateTwitterAuthentication from './generateTwitterAuthentication';

async function generateAuthentication(params) {
  if (params.authentication.length) {
    await generateCommonAuthentication(params);
    await generateEmailAuthentication(params);
    await generateFacebookAuthentication(params);
    await generateGoogleAuthentication(params);
    await generateTwitterAuthentication(params);
  }
}

export default generateAuthentication;
