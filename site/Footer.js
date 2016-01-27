import React from 'react';
import { Router, Route, Link } from 'react-router'

const Footer = (props) => {
  return (
    <footer className="container">
      © 2016 <a href="http://sahatyalkabov.com">Sahat Yalkabov</a>. MIT Licensed.
      <br/>
      <a href="https://github.com/sahat/boilerplate">Source Code</a>
    </footer>
  );
};

export default Footer;
