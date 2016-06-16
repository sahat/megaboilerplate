//= HEADER_AUTH_INDENT2

return (
  <div className="top-bar">
    <div className="top-bar-title">
      <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
        <span className="menu-icon light" data-toggle></span>
      </span>
      <IndexLink to="/">Project name</IndexLink>
    </div>
    <div id="responsive-menu">
      <div className="top-bar-left">
        <ul className="vertical medium-horizontal menu">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/contact" activeClassName="active">Contact</Link></li>
        </ul>
      </div>
      //= HEADER_AUTH_REFERENCE_INDENT5
    </div>
  </div>
);
