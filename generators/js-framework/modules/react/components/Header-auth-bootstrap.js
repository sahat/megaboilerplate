const rightNav = this.props.token ? (
  <ul className="nav navbar-nav navbar-right">
    <li className="dropdown">
      <a href="#" data-toggle="dropdown" className="navbar-avatar dropdown-toggle">
        <img src={this.props.user.picture || this.props.user.gravatar}/>
        {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
        <i className="caret"></i>
      </a>
      <ul className="dropdown-menu">
        <li><Link to="/account">My Account</Link></li>
        <li className="divider"></li>
        <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
      </ul>
    </li>
  </ul>
) : (
  <ul className="nav navbar-nav navbar-right">
    <li><Link to="/login" activeStyle={active}>Log in</Link></li>
    <li><Link to="/signup" activeStyle={active}>Sign up</Link></li>
  </ul>
);
