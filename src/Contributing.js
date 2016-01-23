import React from 'react';
import Header from './Header';

class Contributing extends React.Component {
  render() {
    return (
      <main>
        <Header showJumbotron={false} />
        <div className="container">
          Contributing guide
        </div>
      </main>
    );
  }
}

export default Contributing;
