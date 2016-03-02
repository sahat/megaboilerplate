import generateCommonAuthentication from './generateCommonAuthentication';
import generateLocalAuthentication from './generateLocalAuthentication';
import generateFacebookAuthentication from './generateFacebookAuthentication';
import generateGoogleAuthentication from './generateGoogleAuthentication';
import generateTwitterAuthentication from './generateTwitterAuthentication';

async function generateAuthentication(params) {
  if (params.authentication && params.authentication.length) {
    await generateCommonAuthentication(params);
    await generateLocalAuthentication(params);
    await generateFacebookAuthentication(params);
    await generateGoogleAuthentication(params);
    await generateTwitterAuthentication(params);
  }
}

export default generateAuthentication;
