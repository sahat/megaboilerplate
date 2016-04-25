const rightNav = this.props.token ? (
  <span>
      <li className="avatar">\
        <img src={this.props.user.picture || this.props.user.gravatar}/>
        {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
      </li>
      <li><Link to="/account">My Account</Link></li>
      <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
  </span>
) : (
  <span>
      <li><Link to="/login">Log in</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
  </span>
);


