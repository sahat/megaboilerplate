
// Sign in with Google
export function googleLogin() {
  const google = {
    url: 'http://localhost:3000/auth/google',
    clientId: '814958990796-p1centjebv1k0htp3am05tfg5k10nl0k.apps.googleusercontent.com',
    redirectUri: 'http://localhost:3000/auth/google/callback',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'openid profile email',
    width: 452,
    height: 633
  };

  return (dispatch) => {
    oauth2(google, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}
