<div className="login-container container">
  <div className="panel">
    <div className="panel-body">
      <Messages messages={this.props.messages}/>
      <form onSubmit={this.handleSignup.bind(this)}>
        <legend>Create an account</legend>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" autoFocus className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <small className="text-muted">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</small>
        </div>
        <button type="submit" className="btn btn-success">Create an account</button>
      </form>
      <div className="hr-title"><span>or</span></div>
      <div className="btn-toolbar text-center">
        //= SIGN_IN_WITH_FACEBOOK_INDENT4
        //= SIGN_IN_WITH_TWITTER_INDENT4
        //= SIGN_IN_WITH_GOOGLE_INDENT4
        //= SIGN_IN_WITH_VK_INDENT4
        //= SIGN_IN_WITH_GITHUB_INDENT4
      </div>
    </div>
  </div>
  <p className="text-center">
    Already have an account? <Link to="/login"><strong>Log in</strong></Link>
  </p>
</div>
