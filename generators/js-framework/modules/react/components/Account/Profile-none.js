const googleLinkedAccount = this.props.user.google ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'google')}>Unlink your Google account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'google')}>Link your Google account</a>
);
const facebookLinkedAccount = this.props.user.facebook ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'facebook')}>Unlink your Facebook account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'facebook')}>Link your Facebook account</a>
);
const twitterLinkedAccount = this.props.user.twitter ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'twitter')}>Unlink your Twitter account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'twitter')}>Link your Twitter account</a>
);
const vkLinkedAccount = this.props.user.vk ? (
  <a role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'vk')}>Unlink your VK account</a>
) : (
  <a role="button" onClick={this.handleLink.bind(this, 'vk')}>Link your VK account</a>
);

return (
  <div className="container">
    <Messages messages={this.props.messages}/>
    <form onSubmit={this.handleProfileUpdate.bind(this)}>
      <h5>Profile Information</h5>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
      <label>Gender</label>
      <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="male">Male</label>
      <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="female">Female</label>
      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" value={this.state.location} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="website">Website</label>
      <input type="text" name="website" id="website" value={this.state.website} onChange={this.handleChange.bind(this)}/>
      <label>Gravatar</label>
      <img src={this.state.gravatar} className="gravatar" width="100" height="100"/>
      <button type="submit">Update Profile</button>
    </form>
    <form onSubmit={this.handleChangePassword.bind(this)}>
      <h5>Change Password</h5>
      <label htmlFor="password">New Password</label>
      <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="confirm">Confirm Password</label>
      <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
      <button type="submit">Change Password</button>
    </form>
    <h5>Linked Accounts</h5>
    <p>{googleLinkedAccount}</p>
    <p>{facebookLinkedAccount}</p>
    <p>{twitterLinkedAccount}</p>
    <p>{vkLinkedAccount}</p>
    <form onSubmit={this.handleDeleteAccount.bind(this)}>
      <h5>Delete Account</h5>
      <p>You can delete your account, but keep in mind this action is irreversible.</p>
      <button type="submit">Delete my account</button>
    </form>
  </div>
);
