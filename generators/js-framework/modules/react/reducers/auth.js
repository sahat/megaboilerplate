//import { LOGIN_SUCCESS } from '../actions/auth';

const initialState = {
  token: null,
  user: null,
  errorMessages: []
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_IN_PROGRESS':
      return Object.assign({}, state, {
        errorMessages: []
      });
      return;
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        errorMessages: []
      });
      return;
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        errorMessages: action.messages
      });
    case 'LOGOUT':
      return;
    case 'LOGOUT_SUCCESS':
      return;
    case 'LOGOUT_FAILURE':
      return;
    case 'SIGNUP':
      return;
    case 'SIGNUP_SUCCESS':
      return;
    case 'SIGNUP_FAILURE':
      return;
    default:
      return state;
  }
}

export default authReducer;
