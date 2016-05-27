import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';

ReactDOM.render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
);
