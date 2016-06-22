const githubLinkedAccount = this.props.user.github ? (
  <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'github')}>Unlink your Github account</a>
) : (
  <a href="#" role="button" onClick={this.handleLink.bind(this, 'github')}>Link your Github account</a>
);
