import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
