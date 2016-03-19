import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      errorMessages: []
    };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();

    fetch('/auth/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          console.log('Token', json.token);
        });
      } else {
        response.json().then((json) => {
          this.setState({ errorMessages: Array.isArray(json) ? json : [json] });
        });
      }
    });
  }

  render() {
    const errorMessages = this.state.errorMessages.length ? (
      <div role="alert" className="alert alert-danger">
        {this.state.errorMessages.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : null;

    return (
      <div className="login-container">
        <div className="panel">
          <div className="panel-body">
            {errorMessages}
            <form onSubmit={this.handleLogin}>
              <legend>Log In</legend>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" autoFocus className="form-control" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="form-group"><Link to="/forgot"><strong>Forgot your password?</strong></Link></div>
              <button type="submit" className="btn btn-success">Log in</button>
            </form>
            <div className="hr-title"><abbr>or</abbr></div>
            <div className="text-center">
              <a href="/auth/facebook" className="btn btn-facebook">Sign in with Facebook</a><span> </span>
              <a href="/auth/twitter" className="btn btn-twitter">Sign in with Twitter</a><span> </span>
              <a href="/auth/google" className="btn btn-google">Sign in with Google</a>
            </div>
          </div>
        </div>
        <p className="text-center">
          Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link>
        </p>
      </div>
    );
  }
}

export default Login;
