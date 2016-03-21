import React from 'react';
import { connect } from 'react-redux'
import { forgotPassword, clearMessages } from '../../actions/auth';
import Messages from '../Shared/Messages';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.state = { email: '' };
  }

  componentWillMount() {
    this.props.dispatch(clearMessages());
  }

  handleChange(event) {
    const input = event.target;
    this.setState({ [input.name]: input.value });
  }

  handleForgot(event) {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, token } = this.props;
    dispatch(forgotPassword(email));
  }

  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages} />
            <form onSubmit={this.handleForgot}>
              <legend>Forgot Password</legend>
              <div className="form-group">
                <p>Enter your email address below and we'll send you password reset instructions.</p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" className="form-control" autoFocus value={this.state.email} onChange={this.handleChange}/>
              </div>
              <button type="submit" className="btn btn-success">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapReduxStateToForgotProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapReduxStateToForgotProps)(Forgot);
