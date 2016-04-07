<div className="login-container">
  <div className="panel">
    <div className="panel-body">
      <Messages messages={this.props.messages}/>
      <form onSubmit={this.handleLogin.bind(this)}>
        <legend>Log In</legend>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" autoFocus className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="form-group"><Link to="/forgot"><strong>Forgot your password?</strong></Link></div>
        <button type="submit" className="btn btn-success">Log in</button>
      </form>
      <div className="hr-title"><span>or</span></div>
      <div className="btn-toolbar text-center">
        <button onClick={this.handleFacebook.bind(this)} className="<%= facebookButton %>">Sign in with Facebook</button>
        <button onClick={this.handleTwitter.bind(this)} className="<%= twitterButton %>">Sign in with Twitter</button>
        <button onClick={this.handleGoogle.bind(this)} className="<%= googleButton %>">Sign in with Google</button>
        <button onClick={this.handleVk.bind(this)} className="<%= vkButton %>">Sign in with VK</button>
      </div>
    </div>
  </div>
  <p className="text-center">
    Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link>
  </p>
</div>
