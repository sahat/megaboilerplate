import React from 'react';
import { Route } from 'react-router';
import Home from './Home';
import Demos from './Demos';

export default (
  <Route>
    <Route path="/" component={Home}/>
    <Route path="/demos" component={Demos}/>
  </Route>

);
