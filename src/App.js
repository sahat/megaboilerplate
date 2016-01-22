import React from 'react';
import Hero from './Hero';
import Home from './Home';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default App;
