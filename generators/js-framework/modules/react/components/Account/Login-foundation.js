<div className="column row">
  <div className="row">
    <div className="medium-8 medium-offset-2 columns">
      <Messages messages={this.props.messages}/>

      <form onSubmit={this.handleLogin.bind(this)}>
        <h4>Log In</h4>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>

        <p><Link to="/forgot">Forgot your password?</Link></p>

        <button type="submit" className="button">Log in</button>
      </form>

      <div className="hr-title"><span>or</span></div>

      <div className="button-group">
        //= SIGN_IN_WITH_FACEBOOK_INDENT4
        //= SIGN_IN_WITH_TWITTER_INDENT4
        //= SIGN_IN_WITH_GOOGLE_INDENT4
        //= SIGN_IN_WITH_VK_INDENT4
        //= SIGN_IN_WITH_GITHUB_INDENT4
      </div>

      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  </div>
</div>
