/* global $ */

if (typeof window !== 'undefined') {
  require('velocity-animate');
  require('velocity-animate/velocity.ui');
}

import React from 'react';
import { VelocityComponent } from 'velocity-react';

const timeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

const BRAND_LOGO = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 213.5 246.5">
  <polygon points="213.5,123.6 213.5,185 213.5,185 106.8,246.5 0,185 0,123.6 0.5,123.3 0,123 0,61.6 106.8,0
    211.9,60.8 158.5,91.9 106.8,62 0.5,123.3 106.8,184.6 213.4,123.3 "/>
  </svg>
);

const shuffle = (array) => {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestCommit: null,
      browserIcon: 'globe'
    }
  }

  componentDidMount() {
    this.getBrowserIcon();

    this.getLastCommit();

    // animation priority
    setTimeout(() => {
      this.twitterSdk();
      this.facebookSdk();
      this.googleSdk();
      this.githubSdk();
      this.loadCarbonAds();
    }, 1200);

     // this.renderConnectedDots();

    const strings = shuffle(['Express', 'Middleman', 'Jekyll', 'Meteor', 'React', 'Angular 2', 'Bootstrap', 'Foundation',
      'Gulp', 'Mocha', 'Jasmine', 'Node.js', 'Jade', 'Handlebars', 'Nunjucks', 'Bourbon Neat', 'Sass', 'LESS',
      'Redux', 'React Router', 'ECMAScript 2015', 'Babel', 'React Hot Reloading', 'Browserify', 'Chai', 'Sinon',
      'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Passport', 'PostCSS', 'Socket.IO', 'Karma', 'OAuth 2.0', 'OAuth 1.0',
      'JS Library Generator', 'ESLint', 'Code Coverage'
    ]);

    const h1 = this.refs.heroHeading;
    $(h1).typed({
      strings: strings,
      typeSpeed: 0,
      backDelay: 1200,
      loop: true
    });
  }

  loadCarbonAds() {
    let carbonAdsContainer = this.refs.carbonAds;
    let script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=megaboilerplatecom';
    script.id = '_carbonads_js';
    carbonAdsContainer.appendChild(script);
    ga('send', 'event', 'Mega Boilerplate', 'Carbon Ads', 'Loaded');
  }

  twitterSdk() {
    window.twttr = (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) { t._e.push(f); };
      return t;
    }(document, 'script', 'twitter-wjs'));
  }

  facebookSdk() {
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=980220002068787";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  googleSdk() {
    $.getScript('http://apis.google.com/js/platform.js?async=true');
  }
  githubSdk() {
    $.getScript('https://buttons.github.io/buttons.js?async=true');
  }

  renderConnectedDots() {
    let canvas = this.refs.connectedDots;
    let ctx = canvas.getContext('2d');
    let colorDot = '#fff';
    let color = '#fff';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;

    var mousePosition = {
      x: 30 * canvas.width / 100,
      y: 30 * canvas.height / 100
    };

    var dots = {
      nb: 350,
      distance: 60,
      d_radius: 100,
      array: []
    };

    function Dot() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.vx = -.5 + Math.random();
      this.vy = -.5 + Math.random();

      this.radius = Math.random();
    }

    Dot.prototype = {
      create: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      },

      animate: function() {

        for (let i = 0; i < dots.nb; i++) {

          var dot = dots.array[i];

          if (dot.y < 0 || dot.y > canvas.height) {
            dot.vx = dot.vx;
            dot.vy = -dot.vy;
          }
          else if (dot.x < 0 || dot.x > canvas.width) {
            dot.vx = -dot.vx;
            dot.vy = dot.vy;
          }
          dot.x += dot.vx;
          dot.y += dot.vy;
        }
      },

      line: function() {
        for (let i = 0; i < dots.nb; i++) {
          for (let j = 0; j < dots.nb; j++) {
            var i_dot = dots.array[i];
            var j_dot = dots.array[j];

            if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
              if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                ctx.beginPath();
                ctx.moveTo(i_dot.x, i_dot.y);
                ctx.lineTo(j_dot.x, j_dot.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }
    };

    function createDots() {
      let dot;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot());
        dot = dots.array[i];

        dot.create();
      }

      dot.line();
      dot.animate();
    }

    window.onmousemove = function(parameter) {
      mousePosition.x = parameter.pageX;
      mousePosition.y = parameter.pageY;
    };

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000 / 30);
  }

  getLastCommit() {
    $.get('https://api.github.com/repos/sahat/megaboilerplate/commits', (data) => {
      if (data && data.length) {
        const commit = data[0].commit;
        const date = commit.author.date;

        if (date) {
          this.setState({ latestCommit: timeSince(new Date(date)) + ' ago' });
        }
      }
    });
  }

  getBrowserIcon() {
    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    const isIE = !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = !!window.chrome && !!window.chrome.webstore;

    let browserIcon;

    if (isFirefox) {
      browserIcon = 'firefox';
    } else if (isIE) {
      browserIcon = 'internet-explorer';
    } else if (isEdge) {
      browserIcon = 'edge';
    } else if (isChrome) {
      browserIcon = 'chrome';
    } else if (isOpera) {
      browserIcon = 'opera';
    } else if (isSafari) {
      browserIcon = 'safari';
    }

    this.setState({ browserIcon: browserIcon });
  }

  render() {
    const latestCommit = this.state.latestCommit ? (
      <VelocityComponent runOnMount animation="transition.fadeIn" duration={1000}>
        <div style={{ opacity: 0 }} className="footnote right">Latest commit: <span className="time-ago"><a href="https://github.com/sahat/megaboilerplate/commits/master" target="_blank">{this.state.latestCommit}</a></span></div>
      </VelocityComponent>
    ) : null;

    return (
      <header className="hero">
        <canvas ref="connectedDots"/>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a href="/" className="navbar-brand">
                {BRAND_LOGO}
                <span><strong>Mega</strong> Boilerplate</span>
              </a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="tweet-button">
                  <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=🔥 Mega Boilerplate ★ Handcrafted starter projects, optimized for simplicity and ease of use by @EvNowAndForever." />
                </li>

                <li className="facebook-like-button">
                  <div className="fb-like" data-href="http://megaboilerplate.com" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
                </li>

                <li className="facebook-share-button">
                  <div className="fb-share-button" data-href="http://megaboilerplate.com" data-layout="button_count"></div>
                </li>

                <li className="linkedin-button">
                  <script type="IN/Share" data-counter="right"></script>
                </li>

                <li className="plusone-button">
                  <div className="g-plusone" data-size="medium" data-href="http://megaboilerplate.com"></div>
                </li>

                <li>
                  <a href="https://github.com/sahat/megaboilerplate" className="navbar-icon">
                    <i className="fa fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container hero-container">
          <div className="wrapper animate-float">
            <div className="box middle"></div>
            <div className="box upper"></div>
            <div className="box lower"></div>
          </div>

          <VelocityComponent runOnMount animation="transition.slideDownIn" duration={1200}>
            <h1>
              <strong>Mega</strong> Boilerplate
            </h1>
          </VelocityComponent>
          <div className="lead">
            <VelocityComponent runOnMount animation="transition.slideUpIn" duration={1100} delay={200}>
              <div>Handcrafted starter projects, optimized for <span className="highlight">simplicity</span> and <span className="highlight">ease of use</span>.¹</div>
            </VelocityComponent>
            <VelocityComponent runOnMount animation="transition.slideUpIn" duration={1200} delay={400}>
              <div className="featuring">
                Featuring <span style={{ color: '#fff' }} ref="heroHeading"/>
              </div>
            </VelocityComponent>
            <button type="button" className="btn btn-outline" data-toggle="modal" data-target="#demosModal"><i className={'fa fa-' + this.state.browserIcon}/> Live Demo</button> <a href="https://github.com/sahat/megaboilerplate/tree/master/examples" target="_blank" className="btn btn-outline">Code Examples</a>
          </div>

          <iframe src="https://ghbtns.com/github-btn.html?user=sahat&repo=megaboilerplate&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>

          <div className="visible-lg">
            <img className="hero-arrow" src="https://megaboilerplate.blob.core.windows.net/megaboilerplate/img/arrow.png" alt="Arrow"/>
            <span>Don't forget to <i className="fa fa-star"/> on GitHub if you liked this project!</span>
          </div>

          <div ref="carbonAds"></div>

          <div className="footnote left">¹ Inspired by <a href="https://github.com/sahat/hackathon-starter" target="_blank">Hackathon Starter</a></div>
          {latestCommit}
        </div>
      </header>
    );
  }
}

export default Header;
