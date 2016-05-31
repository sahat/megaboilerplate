import React from 'react';

const Footer = (props) => {
  return (
    <footer className="container">
      <div className="panel">
        <div className="panel-body">
          <div className="pull-left">
            © 2016 <a href="http://sahatyalkabov.com">Sahat Yalkabov</a>. Code licensed under <a href="https://github.com/sahat/megaboilerplate/blob/master/LICENSE">MIT License</a>.
          </div>
          <div className="pull-right">
            <fa className="fa fa-code"></fa> <a href="https://github.com/sahat/megaboilerplate">Source Code</a>
          </div>
        </div>
      </div>

      <a className="twitter-follow-button" href="https://twitter.com/EvNowAndForever">Follow @EvNowAndForever</a>

      <a className="github-button" href="https://github.com/sahat"
         data-count-href="/sahat/followers"
         data-count-api="/users/sahat#followers"
         data-count-aria-label="# followers on GitHub"
         aria-label="Follow @sahat on GitHub">Follow @sahat</a>
    </footer>
  );
};

export default Footer;
