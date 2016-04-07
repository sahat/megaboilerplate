<div className="container">
  <div className="panel">
    <div className="panel-body">
      <Messages messages={this.props.messages} />
      <form onSubmit={this.handleForgot.bind(this)}>
        <legend>Forgot Password</legend>
        <div className="form-group">
          <p>Enter your email address below and we'll send you password reset instructions.</p>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" className="form-control" autoFocus value={this.state.email} onChange={this.handleChange.bind(this)}/>
        </div>
        <button type="submit" className="btn btn-success">Reset Password</button>
      </form>
    </div>
  </div>
</div>
