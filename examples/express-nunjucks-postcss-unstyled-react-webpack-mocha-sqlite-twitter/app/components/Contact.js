import React from 'react';
import { connect } from 'react-redux'
import { submitContactForm } from '../actions/contact';
import Messages from './Messages';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitContactForm(this.state.name, this.state.email, this.state.message));
  }

  render() {
    return (
      <div className="container">
        <h3>Contact Form</h3>
        <Messages messages={this.props.messages}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="message">Body</label>
          <textarea name="message" id="message" rows="7" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
          <br/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Contact);
