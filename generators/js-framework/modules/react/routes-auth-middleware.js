const ensureAuthenticated = (nextState, replace) => {
  if (!store.getState().auth.token) {
    replace('/login');
  }
};
const skipIfAuthenticated = (nextState, replace) => {
  if (store.getState().auth.token) {
    replace('/');
  }
};
