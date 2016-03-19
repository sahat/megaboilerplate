import moment from 'moment';
import cookie from 'react-cookie';

export function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_IN_PROGRESS'
    });
    fetch('/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json.user
          });
        } else {
          dispatch({
            type: 'LOGIN_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}
