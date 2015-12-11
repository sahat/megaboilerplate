import React from 'react';
import { Router, Route, Link } from 'react-router'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/philosophy">Philosophy</Link></li>
              <li><Link to="/contributing">Contributing</Link></li>
              <li><Link to="/trending">Trending</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
