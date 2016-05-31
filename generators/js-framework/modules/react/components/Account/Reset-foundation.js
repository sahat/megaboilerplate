<div className="column row">
  <div className="medium-8 medium-offset-2 columns">
    <Messages messages={this.props.messages}/>

    <form onSubmit={this.handleReset.bind(this)}>
      <h4>Reset Password</h4>

      <label htmlFor="password">New Password</label>
      <input type="password" name="password" id="password" placeholder="New password" value={this.state.password} onChange={this.handleChange.bind(this)} autoFocus/>

      <label htmlFor="confirm">Confirm Password</label>
      <input type="password" name="confirm" id="confirm" placeholder="Confirm password" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>

      <button type="submit" className="success button">Change Password</button>
    </form>
  </div>
</div>
