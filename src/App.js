import React, { Component } from 'react';
import Hero from './Hero';
import Home from './Home';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Hero />
        <main>{this.props.children}</main>
        <Footer/>
      </div>
    );
  }
}
