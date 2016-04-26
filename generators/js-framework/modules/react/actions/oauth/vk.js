
// Sign in with VK
export function vkLogin() {
  const vk = {
    url: 'http://localhost:3000/auth/vkontakte',
    clientId: '5389715',
    redirectUri: 'http://localhost:3000/auth/vkontakte/callback',
    authorizationUrl: 'https://oauth.vk.com/authorize',
    scope: 'email',
    width: 605,
    height: 429
  };

  return (dispatch) => {
    oauth2(vk, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}
