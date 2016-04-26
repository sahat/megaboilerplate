const twitterLinkedAccount = this.props.user.twitter ? (
  <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'twitter')}>Unlink your Twitter account</a>
) : (
  <a href="#" role="button" onClick={this.handleLink.bind(this, 'twitter')}>Link your Twitter account</a>
);
