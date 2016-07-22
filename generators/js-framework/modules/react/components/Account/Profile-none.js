//= FACEBOOK_LINK_INDENT2
//= TWITTER_LINK_INDENT2
//= GOOGLE_LINK_INDENT2
//= VK_LINK_INDENT2
//= GITHUB_LINK_INDENT2

return (
  <div className="container">
    <Messages messages={this.props.messages}/>

    <h4>Profile Information</h4>
    <form onSubmit={this.handleProfileUpdate.bind(this)}>
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

    <h4>Change Password</h4>
    <form onSubmit={this.handleChangePassword.bind(this)}>
      <label htmlFor="password">New Password</label>
      <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="confirm">Confirm Password</label>
      <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
      <br/>
      <button type="submit">Change Password</button>
    </form>

    <h4>Linked Accounts</h4>
    //= FACEBOOK_LINK_REFERENCE_INDENT4
    //= TWITTER_LINK_REFERENCE_INDENT4
    //= GOOGLE_LINK_REFERENCE_INDENT4
    //= VK_LINK_REFERENCE_INDENT4
    //= GITHUB_LINK_REFERENCE_INDENT4

    <h4>Delete Account</h4>
    <form onSubmit={this.handleDeleteAccount.bind(this)}>
      <p>You can delete your account, but keep in mind this action is irreversible.</p>
      <button type="submit">Delete my account</button>
    </form>
  </div>
);
