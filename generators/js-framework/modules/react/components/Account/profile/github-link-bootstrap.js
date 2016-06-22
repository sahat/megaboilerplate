const githubLinkedAccount = this.props.user.github ? (
  <a role="button" className="text-danger" onClick={this.handleUnlink.bind(this, 'github')}>Unlink your Github account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'github')}>Link your Github account</a>
);
