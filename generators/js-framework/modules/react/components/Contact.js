import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Contact Form</h3>
          </div>
          <div className="panel-body">
            <form method="POST" className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-sm-2">Name</label>
                <div className="col-sm-8">
                  <input type="text" name="name" id="name" autoFocus className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-2">Email</label>
                <div className="col-sm-8">
                  <input type="email" name="email" id="email" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="col-sm-2">Body</label>
                <div className="col-sm-8">
                  <textarea name="message" id="message" rows="7" className="form-control"></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-8">
                  <button type="submit" className="btn btn-success">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
