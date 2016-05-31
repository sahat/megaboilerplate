const active = { borderBottomColor: '#3f51b5' };

//= HEADER_AUTH_INDENT2

return (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <IndexLink to="/" className="navbar-brand">Project name</IndexLink>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><IndexLink to="/" activeStyle={active}>Home</IndexLink></li>
          <li><Link to="/contact" activeStyle={active}>Contact</Link></li>
        </ul>
        //= HEADER_AUTH_REFERENCE_INDENT6
      </div>
    </div>
  </nav>
);
