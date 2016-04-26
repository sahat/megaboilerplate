import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
//= AUTH_ROUTES_IMPORT

export default function getRoutes(store) {
  //= AUTH_MIDDLEWARE_INDENT1
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      //= AUTH_ROUTES_INDENT3
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
