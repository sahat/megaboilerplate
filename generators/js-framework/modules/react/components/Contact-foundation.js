<div className="expanded row">
  <div className="row">
    <h3>Contact Form</h3>
    <Messages messages={this.props.messages}/>
    <form onSubmit={this.handleSubmit.bind(this)}>
      <div className="row">
        <div className="medium-8 columns">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
        </div>
      </div>
      <div className="row">
        <div className="medium-8 columns">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
        </div>
      </div>
      <div className="row">
        <div className="medium-8 columns">
          <label htmlFor="message">Body</label>
          <textarea name="message" id="message" rows="7" value={this.state.message} onChange={this.handleChange.bind(this)}></textarea>
        </div>
      </div>
      <button type="submit" className="button">Send</button>
    </form>
  </div>
</div>
