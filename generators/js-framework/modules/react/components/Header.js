import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Project name</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
