const rightNav = this.props.token ? (
  <ul className="list-inline">
      <li>
        <img className="avatar" src={this.props.user.picture || this.props.user.gravatar}/>
        {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
      </li>
      <li><Link to="/account">My Account</Link></li>
      <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
  </ul>
) : (
  <ul className="list-inline">
      <li><Link to="/login">Log in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
  </ul>
);


