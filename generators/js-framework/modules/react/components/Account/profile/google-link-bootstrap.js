const googleLinkedAccount = this.props.user.google ? (
  <a role="button" className="text-danger" onClick={this.handleUnlink.bind(this, 'google')}>Unlink your Google account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'google')}>Link your Google account</a>
);
