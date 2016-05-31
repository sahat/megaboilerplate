import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import Messages from '../Messages';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {
    const twitterLinkedAccount = this.props.user.twitter ? (
      <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'twitter')}>Unlink your Twitter account</a>
    ) : (
      <a href="#" role="button" onClick={this.handleLink.bind(this, 'twitter')}>Link your Twitter account</a>
    );
    return (
      <div className="container">
        <Messages messages={this.props.messages}/>
        <h4>Profile Information</h4>
        <form onSubmit={this.handleProfileUpdate.bind(this)}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
          <label>Gender</label>
          <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="female">Female</label>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" value={this.state.location} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="website">Website</label>
          <input type="text" name="website" id="website" value={this.state.website} onChange={this.handleChange.bind(this)}/>
          <label>Gravatar</label>
          <img src={this.state.gravatar} className="gravatar" width="100" height="100"/>
          <button type="submit">Update Profile</button>
        </form>
        <h4>Change Password</h4>
        <form onSubmit={this.handleChangePassword.bind(this)}>
          <label htmlFor="password">New Password</label>
          <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
          <br/>
          <button type="submit">Change Password</button>
        </form>
        <h4>Linked Accounts</h4>
        <p>{twitterLinkedAccount}</p>
        <h4>Delete Account</h4>
        <form onSubmit={this.handleDeleteAccount.bind(this)}>
          <p>You can delete your account, but keep in mind this action is irreversible.</p>
          <button type="submit">Delete my account</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);
