import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form method="POST" action="/account?_method=PUT" className="form-horizontal">
              <legend>Profile Information</legend>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-3">Email</label>
                <div className="col-sm-7">
                  <input type="email" name="email" id="email" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3">Name</label>
                <div className="col-sm-7">
                  <input type="text" name="name" id="name" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Gender</label>
                <div className="col-sm-4">
                  <label className="radio-inline radio col-sm-4">
                    <input type="radio" name="gender" value="male" data-toggle="radio"/><span>Male</span>
                  </label>
                  <label className="radio-inline col-sm-4">
                    <input type="radio" name="gender" value="female" data-toggle="radio"/><span>Female</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="location" className="col-sm-3">Location</label>
                <div className="col-sm-7">
                  <input type="text" name="location" id="location" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="website" className="col-sm-3">Website</label>
                <div className="col-sm-7">
                  <input type="text" name="website" id="website" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3">Gravatar</label>
                <div className="col-sm-4"><img src="" width="100" height="100" className="profile"/></div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <button type="submit" className="btn btn-success">Update Profile</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form method="POST" action="/account?_method=PUT" className="form-horizontal">
              <legend>Change Password</legend>
              <div className="form-group">
                <label htmlFor="password" className="col-sm-3">New Password</label>
                <div className="col-sm-7">
                  <input type="password" name="password" id="password" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm" className="col-sm-3">Confirm Password</label>
                <div className="col-sm-7">
                  <input type="password" name="confirm" id="confirm" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-3">
                  <button type="submit" className="btn btn-success">Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <div className="form-horizontal">
              <legend>Linked Accounts</legend>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <p><a href="/unlink/google" className="text-danger">Unlink your Google account</a></p>
                  <p><a href="/auth/google">Link your Google account</a></p>
                  <p><a href="/unlink/facebook" className="text-danger">Unlink your Facebook account</a></p>
                  <p><a href="/auth/facebook">Link your Facebook account</a></p>
                  <p><a href="/unlink/twitter" className="text-danger">Unlink your Twitter account</a></p>
                  <p><a href="/auth/twitter">Link your Twitter account</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form method="POST" action="/account?_method=DELETE" className="form-horizontal">
              <legend>Delete Account</legend>
              <div className="form-group">
                <p className="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-danger">Delete my account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
