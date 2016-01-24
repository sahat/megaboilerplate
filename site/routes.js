import React from 'react';
import { Route } from 'react-router';
import App from './App';
import Home from './Home';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
  </Route>
);
