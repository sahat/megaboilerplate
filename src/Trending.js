import React from 'react';
import Header from './Header';

class Trending extends React.Component {
  render() {
    return (
      <main>
        <Header showJumbotron={false} />
        <div className="container">
          Trending chart
        </div>
      </main>
    );
  }
}

export default Trending;
