const facebookLinkedAccount = this.props.user.facebook ? (
  <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'facebook')}>Unlink your Facebook account</a>
) : (
  <a href="#" role="button" onClick={this.handleLink.bind(this, 'facebook')}>Link your Facebook account</a>
);
