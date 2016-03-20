import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    const { user } = this.props;

    let rightNav;

    if (user) {
      rightNav = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" data-toggle="dropdown" className="navbar-avatar dropdown-toggle">
              <img src={user.picture || user.gravatar} /> {user.name || user.email || user.id}
              <i className="caret"></i>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/account">My Account</Link></li>
              <li className="divider"></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </li>
        </ul>
      );
    } else {
      rightNav = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      );
    }

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
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapReduxStateToHeaderProps = (state) => {
  return {
    token: state.token,
    user: state.user
  };
};

export default connect(mapReduxStateToHeaderProps)(Header);
