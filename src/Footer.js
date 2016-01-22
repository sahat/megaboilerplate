import React from 'react';
import { Router, Route, Link } from 'react-router'

const Footer = (props) => {
    return (
      <footer className="text-center">
        <p>
          Mega Boilerplate <span className="hide-xs">·</span> Created by <a href="http://sahatyalkabov.com">Sahat Yalkabov</a>
        </p>
        <p>
          Code licensed under <a href="http://opensource.org/licenses/mit-license.html">MIT License</a>
        </p>
        <p>
          <a href="https://github.com/sahat/boilerplate">GitHub Project</a> · <a href="https://github.com/sahat/boilerplate/issues">Issues</a>
        </p>
      </footer>
    );
};

export default Footer;
