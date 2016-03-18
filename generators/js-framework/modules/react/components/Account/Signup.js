import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
  render() {
    return (
      <div className="login-container">
        <div className="panel">
          <div className="panel-body">
            <form method="POST">
              <legend>Create an account</legend>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Name" autoFocus className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="form-control"/>
              </div>
              <div className="form-group"><small className="text-muted">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</small></div>
              <button type="submit" className="btn btn-success">Create an account</button>
            </form>
            <div className="hr-title"><abbr>or</abbr></div>
            <div className="text-center">
              <a href="/auth/facebook" className="btn btn-facebook">Sign in with Facebook</a><span> </span>
              <a href="/auth/twitter" className="btn btn-twitter">Sign in with Twitter</a><span> </span>
              <a href="/auth/google" className="btn btn-google">Sign in with Google</a></div>
          </div>
        </div>
        <p className="text-center">
          Already have an account? <Link to="/login"><strong>Log in</strong></Link>
        </p>
      </div>
    );
  }
}

export default Signup;
