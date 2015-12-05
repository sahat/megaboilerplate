import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="#">Home</a></li>
              <li><a href="#">Philosophy</a></li>
              <li><a href="#">Contributing</a></li>
              <li><a href="#">Trending</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
