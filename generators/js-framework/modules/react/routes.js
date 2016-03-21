import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

export default (store) => {
  const requireAuth = (nextState, replace) => {
    if (!store.getState().token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().token) {
      replace('/');
    }
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated}/>
      <Route path="/account" component={Profile} onEnter={requireAuth}/>
      <Route path="/forgot" component={Forgot}/>
      <Route path='/reset' component={Reset}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
