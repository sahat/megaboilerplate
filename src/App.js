import React, { Component } from 'react';
import Hero from './Hero';
import Home from './Home';

export class App extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Home />
      </div>
    );
  }
}