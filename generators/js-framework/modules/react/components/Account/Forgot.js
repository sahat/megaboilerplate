import React from 'react';

class Forgot extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form method="POST">
              <legend>Forgot Password</legend>
              <div className="form-group">
                <p>Enter your email address below and we'll send you password reset instructions.</p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" autoFocus className="form-control"/>
              </div>
              <button type="submit" className="btn btn-success">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Forgot;
