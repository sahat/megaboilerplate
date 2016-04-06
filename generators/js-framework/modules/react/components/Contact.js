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
      <div className="<%= container %>">
        <div className="<%= panel %>">
          <div className="<%= panelHeading %>">
            <h3 className="<%= panelTitle %>">Contact Form</h3>
          </div>
          <div className="<%= panelBody %>">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSubmit.bind(this)} className="<%= horizontalForm %>">
              <div className="<%= formGroup %>">
                <label htmlFor="name" className="<%= col2 %>">Name</label>
                <div className="<%= col8 %>">
                  <input type="text" name="name" id="name" className="<%= formInput %>" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
                </div>
              </div>
              <div className="<%= formGroup %>">
                <label htmlFor="email" className="<%= col2 %>">Email</label>
                <div className="<%= col8 %>">
                  <input type="email" name="email" id="email" className="<%= formInput %>" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="<%= formGroup %>">
                <label htmlFor="message" className="<%= col2 %>">Body</label>
                <div className="<%= col8 %>">
                  <textarea name="message" id="message" rows="7" className="<%= formInput %>" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
                </div>
              </div>
              <div className="<%= formGroup %>">
                <div className="<%= col2OffsetCol8 %>">
                  <button type="submit" className="<%= successButton %>">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
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
