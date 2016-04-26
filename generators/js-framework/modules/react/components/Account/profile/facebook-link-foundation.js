const facebookLinkedAccount = this.props.user.facebook ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'facebook')}>Unlink your Facebook account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'facebook')}>Link your Facebook account</a>
);
