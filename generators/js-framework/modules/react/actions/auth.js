import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function clearMessages() {
  return {
    type: 'CLEAR_MESSAGES'
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(clearMessages());
    fetch('/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push('/account');
        });
      } else {
        response.json().then((json) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function signup(name, email, password) {
  return (dispatch) => {
    dispatch(clearMessages());
    fetch('/auth/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password })
    }).then((response) => {
      response.json().then((json) => {
        if (response.ok) {
          cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          dispatch({
            type: 'SIGNUP_SUCCESS',
            token: json.token,
            user: json.user
          });
        } else {
          dispatch({
            type: 'SIGNUP_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        }
      });
    });
  };
}

export function updateProfile(state, token) {
  return (dispatch) => {
    dispatch(clearMessages());
    fetch('/account', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        email: state.email,
        name: state.name,
        gender: state.gender,
        location: state.location,
        website: state.website
      })
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch({
            type: 'UPDATE_PROFILE_SUCCESS',
            messages: [json]
          });
        });
      } else {
        response.json().then((json) => {
          dispatch({
            type: 'UPDATE_PROFILE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function changePassword(password, confirm) {

}

export function deleteAccount() {
  return (dispatch) => {
    dispatch(clearMessages());
    fetch('/account', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          dispatch({
            type: 'DELETE_ACCOUNT_SUCCESS',
            messages: [json]
          });
        });
      } else {
        response.json().then((json) => {
          dispatch({
            type: 'DELETE_ACCOUNT_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
