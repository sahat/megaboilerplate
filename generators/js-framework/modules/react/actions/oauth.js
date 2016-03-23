import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function facebookLogin() {
  const facebook = {
    clientId: '603122136500203',
    redirectUri: 'http://localhost:3000/',
    url: 'http://localhost:3000/auth/facebook',
    authorizationUrl: 'https://www.facebook.com/v2.5/dialog/oauth',
    scope: 'email,user_location',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 }
  };
  return openPopup(facebook);
}

export function googleLogin() {
  const google = {
    clientId: '828110519058.apps.googleusercontent.com',
    redirectUri: 'http://localhost:3000',
    url: 'http://localhost:3000/auth/google',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    scope: 'openid profile email',
    oauthType: '2.0',
    popupOptions: { width: 452, height: 633 }
  };
  return openPopup(google);
}

export function twitterLogin() {
  const twitter = {
    redirectUri: 'http://localhost:3000',
    url: 'http://localhost:3000/auth/twitter',
    authorizationUrl: 'https://api.twitter.com/oauth/authenticate',
    oauthType: '1.0',
    popupOptions: { width: 495, height: 645 }
  };
  return openPopup(twitter);
}

function openPopup(config) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });

    const url = [config.authorizationUrl, buildUrlParams(config)].join('?');
    const options = stringifyOptions(config.popupOptions);
    const popup = window.open(url, '_blank', options);

    const redirectUriParser = document.createElement('a');
    redirectUriParser.href = config.redirectUri;
    const redirectUri = getFullUrl(redirectUriParser);

    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
      }

      try {
        const popupUrl = getFullUrl(popup.location);

        if (popupUrl === redirectUri) {
          if (popup.location.search || popup.location.hash) {
            const hash = parseQueryString(popup.location.hash.substring(1).replace(/[\/$]/, ''));
            const query = parseQueryString(popup.location.search.substring(1).replace(/\/$/, ''));
            const combinedParams = Object.assign({}, query, hash);

            if (combinedParams.error) {
              dispatch({
                type: 'OAUTH_ERROR',
                messages: [{ msg: combinedParams.error }]
              });
            } else {
              dispatch(exchangeCodeForToken(combinedParams.code, config));
            }
          } else {
            dispatch({
              type: 'OAUTH_ERROR',
              messages: [{
                msg: 'Redirect has occurred but no query or hash parameters were found. ' +
                'They were either not set during the redirect, or were removed before they ' +
                'could be parsed.'
              }]
            });
          }
          clearInterval(polling);
          popup.close();
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  };
}

function exchangeCodeForToken(code, options) {
  return (dispatch) => {
    fetch(options.url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code,
        clientId: options.clientId,
        redirectUri: options.redirectUri
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch({
            type: 'OAUTH_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push('/account');
        });
      } else {
        response.json().then((json) => {
          dispatch({
            type: 'OAUTH_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

function buildUrlParams(options) {
  var keyValuePairs = [
    ['client_id', options.clientId],
    ['redirect_uri', options.redirectUri],
    ['scope', options.scope],
    ['display', 'popup'],
    ['response_type', 'code']
  ];
  return keyValuePairs.map(pair => pair.join('=')).join('&');
}

function getFullUrl(location) {
  return location.protocol + '//' + location.hostname +
    ':' + (location.port || (location.protocol === 'https:' ? '443' : '80')) +
    (/^\//.test(location.pathname) ? location.pathname : '/' + location.pathname);
}

function parseQueryString(str) {
  const obj = {};

  str.split('&').map((keyValue) => {
    if (keyValue) {
      const value = keyValue.split('=');
      const key = decodeURIComponent(value[0]);
      obj[key] = decodeURIComponent(value[1]);
    }
  });

  return obj;
}

function stringifyOptions({ width=500, height=500 }) {
  const options = {
    width: width,
    height: height,
    left: window.screenX + ((window.outerWidth - width) / 2),
    top: window.screenY + ((window.outerHeight - height) / 2.5)
  };

  const parts = [];

  for (const key in options) {
    if (options.hasOwnProperty(key)) {
      const value = options[key];
      parts.push(key + '=' + value)
    }
  }

  return parts.join(',');
}
