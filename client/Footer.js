import React from 'react';

const Footer = (props) => {
  return (
    <footer className="container">
      <div className="panel">
        <div className="panel-body">
          <div className="pull-left">© 2016 <a href="http://sahatyalkabov.com">Sahat Yalkabov</a>. MIT Licensed.
            <br/>
          </div>
          <div className="pull-right">
            <fa className="fa fa-code"></fa> <a href="https://github.com/sahat/boilerplate">Source Code</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
