handleLogout(event) {
  event.preventDefault();
  this.props.dispatch(logout());
}
