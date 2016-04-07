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

      <div className="button-toolbar">
        <button onClick={this.handleFacebook.bind(this)} className="button facebook">Sign in with Facebook</button>
        <button onClick={this.handleTwitter.bind(this)} className="button twitter">Sign in with Twitter</button>
        <button onClick={this.handleGoogle.bind(this)} className="button google">Sign in with Google</button>
        <button onClick={this.handleVk.bind(this)} className="button vk">Sign in with VK</button>
      </div>

      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  </div>
</div>
