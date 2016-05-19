$authProvider.oauth2({
  name: 'vk',
  url: '/auth/vkontakte',
  clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
  redirectUri: 'http://localhost:3000/auth/vkontakte/callback',
  authorizationEndpoint: 'https://oauth.vk.com/authorize',
  scope: 'email',
  popupOptions: { width: 605, height: 429 }
});
