import React from 'react';
import { connect } from 'react-redux'
import { resetPassword } from '../../actions/auth';
import Messages from '../Messages';

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', confirm: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleReset(event) {
    event.preventDefault();
    this.props.dispatch(resetPassword(this.state.password, this.state.confirm, this.props.params.token));
  }

  render() {
    return (
      //= RESET_RENDER_INDENT3
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Reset);

