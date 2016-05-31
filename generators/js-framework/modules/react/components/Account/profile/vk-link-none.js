const vkLinkedAccount = this.props.user.vk ? (
  <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'vk')}>Unlink your VK account</a>
) : (
  <a href="#" role="button" onClick={this.handleLink.bind(this, 'vk')}>Link your VK account</a>
);
