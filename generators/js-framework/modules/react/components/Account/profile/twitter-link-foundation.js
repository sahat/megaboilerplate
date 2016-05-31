const twitterLinkedAccount = this.props.user.twitter ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'twitter')}>Unlink your Twitter account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'twitter')}>Link your Twitter account</a>
);
