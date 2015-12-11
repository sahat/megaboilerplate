import React, { Component } from 'react';
import Hero from './Hero';
import Home from './Home';

export default class App extends Component {
  render() {
    return (
      <div>
        <Hero />
        {this.props.children}
      </div>
    );
  }
}
