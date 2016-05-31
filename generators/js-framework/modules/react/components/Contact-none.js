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
