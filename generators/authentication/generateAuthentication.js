let generateCommonAuthentication = require('./generateCommonAuthentication');
let generateEmailAuthentication = require('./generateEmailAuthentication');
let generateFacebookAuthentication = require('./generateFacebookAuthentication');
let generateGoogleAuthentication = require('./generateGoogleAuthentication');
let generateTwitterAuthentication = require('./generateTwitterAuthentication');

async function generateAuthentication(params) {
  await generateCommonAuthentication(params);
  await generateEmailAuthentication(params);
  await generateFacebookAuthentication(params);
  await generateGoogleAuthentication(params);
  await generateTwitterAuthentication(params);
}

module.exports = generateAuthentication;
