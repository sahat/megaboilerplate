
// Sign in with Facebook
export function facebookLogin() {
  const facebook = {
    url: 'http://localhost:3000/auth/facebook',
    clientId: '980220002068787',
    redirectUri: 'http://localhost:3000/auth/facebook/callback',
    authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
    scope: 'email,user_location',
    width: 580,
    height: 400
  };

  return (dispatch) => {
    oauth2(facebook, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}
