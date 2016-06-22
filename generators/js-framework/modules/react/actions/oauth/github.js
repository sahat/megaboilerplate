
// Sign in with Github
export function githubLogin() {
  const github = {
    url: 'http://localhost:3000/auth/github',
    clientId: 'c8d5bf482c0ece46fa1a',
    redirectUri: 'http://localhost:3000/auth/github/callback',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    scope: 'user:email profile repo',
    width: 452,
    height: 633
  };

  return (dispatch) => {
    oauth2(github, dispatch)
      .then(openPopup)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}
