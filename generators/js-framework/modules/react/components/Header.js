import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'

class Header extends React.Component {
  render() {
    const ACTIVE = { borderBottomColor: '#3f51b5' };
    const { token, user } = this.props;

    let rightNav;

    if (token) {
      rightNav = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" data-toggle="dropdown" className="navbar-avatar dropdown-toggle">
              <img src={user.picture || user.gravatar}/> {user.name || user.email || user.id}
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
          <li><Link to="/login" activeStyle={ACTIVE}>Log in</Link></li>
          <li><Link to="/signup" activeStyle={ACTIVE}>Sign up</Link></li>
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
            <IndexLink to="/" activeStyle={ACTIVE} className="navbar-brand">Project name</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={ACTIVE}>Home</IndexLink></li>
              <li><Link to="/contact" activeStyle={ACTIVE}>Contact</Link></li>
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
