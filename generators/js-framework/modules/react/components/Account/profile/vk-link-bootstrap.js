const vkLinkedAccount = this.props.user.vk ? (
  <a role="button" className="text-danger" onClick={this.handleUnlink.bind(this, 'vk')}>Unlink your VK account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'vk')}>Link your VK account</a>
);
