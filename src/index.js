import React from 'react';
import {render} from 'react-dom';
import { Router, Route } from 'react-router';
import App from './App';
import Home from './Home';
import Philosophy from './Philosophy';
import Contributing from './Contributing';
import Trending from './Trending';


render((
  <Router>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/philosophy" component={Philosophy}/>
      <Route path="/contributing" component={Contributing}/>
      <Route path="/trending" component={Trending}/>
    </Route>
  </Router>
), document.getElementById('root'));
