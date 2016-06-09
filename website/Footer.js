import React from 'react';

const Footer = (props) => {
  return (
    <footer className="container">
      <div className="panel">
        <div className="panel-body">
          <div className="pull-left">
            <div>© 2016 <a href="http://sahatyalkabov.com" target="_blank">Sahat Yalkabov</a>. Code licensed under <a href="https://github.com/sahat/megaboilerplate/blob/master/LICENSE" target="_blank">MIT License</a>.</div>
            <div>For general questions, comments and feedback send me an <a href="mailto:sahat@me.com">email</a>.</div>
          </div>
          <div className="pull-right text-right">
            <a href="https://github.com/sahat/megaboilerplate#changelog" target="_blank">Changelog</a>
            {' · '}
            <a href="https://github.com/sahat/megaboilerplate" target="_blank">Source Code</a>
            <div><strong><i className="fa fa-code"></i></strong> with <i className="fa fa-heart text-danger"></i> using <strong>Node.js</strong> and <strong>React</strong></div>
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
