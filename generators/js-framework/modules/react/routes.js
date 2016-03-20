import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

export default (
  <Route component={App}>
    <Route path='/' component={Home}/>
    <Route path='/contact' component={Contact}/>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/account' component={Profile}/>
    <Route path='/forgot' component={Forgot}/>
    <Route path='/reset' component={Reset}/>
  </Route>
);
