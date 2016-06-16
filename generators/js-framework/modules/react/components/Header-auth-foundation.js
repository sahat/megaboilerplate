const rightNav = this.props.token ? (
  <div className="top-bar-right">
    <ul className="vertical medium-horizontal menu">
      <li><Link to="/account" activeClassName="active">My Account</Link></li>
      <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
    </ul>
  </div>
) : (
  <div className="top-bar-right">
    <ul className="vertical medium-horizontal menu">
      <li><Link to="/login" activeClassName="active">Log in</Link></li>
      <li><Link to="/signup" activeClassName="active">Sign up</Link></li>
    </ul>
  </div>
);
