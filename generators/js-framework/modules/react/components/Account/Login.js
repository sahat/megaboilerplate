import React from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.dispatch(login(email, password));
  }

  render() {
    console.log('Data', this.props);
    const props = this.props;

    const errorMessages = props.errorMessages.length ? (
      <div role="alert" className="alert alert-danger">
        {props.errorMessages.map((message, index) => <div key={index}>{message.msg}</div>)}
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

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    errorMessages: state.errorMessages
  }
};

export default connect(mapStateToProps)(Login);
