
// Sign in with Twitter
export function twitterLogin() {
  const twitter = {
    url: 'http://localhost:3000/auth/twitter',
    redirectUri: 'http://localhost:3000/auth/twitter/callback',
    authorizationUrl: 'https://api.twitter.com/oauth/authenticate'
  };

  return (dispatch) => {
    oauth1(twitter, dispatch)
      .then(openPopup)
      .then(getRequestToken)
      .then(pollPopup)
      .then(exchangeCodeForToken)
      .then(signIn)
      .then(closePopup);
  };
}
