import React from 'react';
import {Route} from 'react-router';
import App from './App';
import Home from './Home';
import Contributing from './Contributing';
import Trending from './Trending';

export default (
  <Route component={App}>
    <Route path="/" component={Home}/>
    <Route path="/trending" component={Trending}/>
    <Route path="/contributing" component={Contributing}/>
  </Route>
);
