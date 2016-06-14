<div className="container">
  <div className="panel">
    <div className="panel-heading">
      <h3 className="panel-title">Contact Form</h3>
    </div>
    <div className="panel-body">
      <Messages messages={this.props.messages}/>
      <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2">Name</label>
          <div className="col-sm-8">
            <input type="text" name="name" id="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2">Email</label>
          <div className="col-sm-8">
            <input type="email" name="email" id="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this)}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message" className="col-sm-2">Body</label>
          <div className="col-sm-8">
            <textarea name="message" id="message" rows="7" className="form-control" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
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
