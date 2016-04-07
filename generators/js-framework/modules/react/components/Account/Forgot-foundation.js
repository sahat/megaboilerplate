<div className="column row">
  <div className="medium-8 medium-offset-2 columns">
    <Messages messages={this.props.messages}/>
    <form onSubmit={this.handleForgot.bind(this)}>
      <h4>Forgot Password</h4>

      <p>Enter your email address below and we'll send you password reset instructions.</p>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus/>

      <button type="submit" className="button success">Reset Password</button>
    </form>
  </div>
</div>
