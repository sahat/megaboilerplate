import React from 'react';
import { Router, Route, Link } from 'react-router'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/" activeClassName="active">Home</Link></li>
              <li><Link to="/philosophy" activeClassName="active">Philosophy</Link></li>
              <li><Link to="/contributing" activeClassName="active">Contributing</Link></li>
              <li><Link to="/trending" activeClassName="active">Trending</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
