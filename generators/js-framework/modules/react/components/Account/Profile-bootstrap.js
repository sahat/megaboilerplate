//= FACEBOOK_LINK_INDENT2
//= TWITTER_LINK_INDENT2
//= GOOGLE_LINK_INDENT2
//= VK_LINK_INDENT2
//= GITHUB_LINK_INDENT2

return (
  <div className="container">
    <div className="panel">
      <div className="panel-body">
        <Messages messages={this.props.messages}/>
        <form onSubmit={this.handleProfileUpdate.bind(this)} className="form-horizontal">
          <legend>Profile Information</legend>
          <div className="form-group">
            <label htmlFor="email" className="col-sm-3">Email</label>
            <div className="col-sm-7">
              <input type="email" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-3">Name</label>
            <div className="col-sm-7">
              <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3">Gender</label>
            <div className="col-sm-4">
              <label className="radio-inline radio col-sm-4">
                <input type="radio" name="gender" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/><span>Male</span>
              </label>
              <label className="radio-inline col-sm-4">
                <input type="radio" name="gender" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/><span>Female</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location" className="col-sm-3">Location</label>
            <div className="col-sm-7">
              <input type="text" name="location" id="location" className="form-control" value={this.state.location} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="website" className="col-sm-3">Website</label>
            <div className="col-sm-7">
              <input type="text" name="website" id="website" className="form-control" value={this.state.website} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3">Gravatar</label>
            <div className="col-sm-4">
              <img src={this.state.gravatar} width="100" height="100" className="profile"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-4">
              <button type="submit" className="btn btn-success">Update Profile</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="panel">
      <div className="panel-body">
        <form onSubmit={this.handleChangePassword.bind(this)} className="form-horizontal">
          <legend>Change Password</legend>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-3">New Password</label>
            <div className="col-sm-7">
              <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm" className="col-sm-3">Confirm Password</label>
            <div className="col-sm-7">
              <input type="password" name="confirm" id="confirm" className="form-control" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-3">
              <button type="submit" className="btn btn-success">Change Password</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div className="panel">
      <div className="panel-body">
        <div className="form-horizontal">
          <legend>Linked Accounts</legend>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-4">
              //= FACEBOOK_LINK_REFERENCE_INDENT9
              //= TWITTER_LINK_REFERENCE_INDENT9
              //= GOOGLE_LINK_REFERENCE_INDENT9
              //= VK_LINK_REFERENCE_INDENT9
              //= GITHUB_LINK_REFERENCE_INDENT9
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="panel">
      <div className="panel-body">
        <form onSubmit={this.handleDeleteAccount.bind(this)} className="form-horizontal">
          <legend>Delete Account</legend>
          <div className="form-group">
            <p className="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>
            <div className="col-sm-offset-3 col-sm-9">
              <button type="submit" className="btn btn-danger">Delete my account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);
