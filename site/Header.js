/* global $ */

if (typeof window !== 'undefined') {
  require('velocity-animate');
  require('velocity-animate/velocity.ui');
}

import React from 'react';
import cx from 'classnames';
import { Router, Route, Link } from 'react-router';
import { shuffle } from 'lodash/collection';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';

const BRAND_LOGO = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 213.5 246.5">
  <polygon points="213.5,123.6 213.5,185 213.5,185 106.8,246.5 0,185 0,123.6 0.5,123.3 0,123 0,61.6 106.8,0
    211.9,60.8 158.5,91.9 106.8,62 0.5,123.3 106.8,184.6 213.4,123.3 "/>
  </svg>
);

const GITHUB_LOGO = (
  <svg viewBox="0 0 620.25 180.34375" xmlns="http://www.w3.org/2000/svg" width="68px" height="20px" version="1.1">
    <defs>
      <clipPath clipPathUnits="userSpaceOnUse">
        <path d="m 0,0 4802,0 0,1298.75 -4802,0 L 0,0 z"/>
      </clipPath>
    </defs>
    <g transform="translate(-85.589293,-376.9046)">
      <g transform="matrix(1.25,0,0,-1.25,85.589293,539.24835)">
        <g transform="scale(0.1,0.1)">
          <g>
            <g clipPath="url(#clipPath3020)">
              <path d="m 924.973,742.875 -403.567,0 c -10.41,0 -18.855,-8.449 -18.855,-18.867 l 0,-197.305 c 0,-10.41 8.445,-18.887 18.855,-18.887 l 157.434,0 0,-245.136 c 0,0 -35.356,-12.051 -133.078,-12.051 -115.301,0 -276.367,42.133 -276.367,396.312 0,354.259 167.714,400.869 325.175,400.869 136.297,0 195.02,-24 232.383,-35.56 11.738,-3.6 22.598,8.09 22.598,18.51 l 45.019,190.64 c 0,4.87 -1.648,10.74 -7.207,14.73 -15.175,10.82 -107.746,62.62 -341.601,62.62 C 276.348,1298.75 0,1184.13 0,633.129 0,82.1094 316.395,0 583.02,0 c 220.757,0 354.683,94.3398 354.683,94.3398 5.52,3.0508 6.113,10.7622 6.113,14.3012 l 0,615.367 c 0,10.418 -8.433,18.867 -18.843,18.867"/>
              <path d="m 3004.75,1232.73 c 0,10.5 -8.32,18.97 -18.73,18.97 l -227.23,0 c -10.38,0 -18.82,-8.47 -18.82,-18.97 0,-0.05 0.06,-439.125 0.06,-439.125 l -354.19,0 0,439.125 c 0,10.5 -8.36,18.97 -18.75,18.97 l -227.22,0 c -10.34,0 -18.77,-8.47 -18.77,-18.97 l 0,-1189.0308 c 0,-10.4883 8.43,-19.0273 18.77,-19.0273 l 227.22,0 c 10.39,0 18.75,8.539 18.75,19.0273 l 0,508.5898 354.19,0 c 0,0 -0.62,-508.5507 -0.62,-508.5898 0,-10.4883 8.43,-19.0273 18.82,-19.0273 l 227.77,0 c 10.41,0 18.73,8.539 18.75,19.0273 l 0,1189.0308"/>
              <path d="m 1353.76,1076.7 c 0,81.82 -65.6,147.94 -146.53,147.94 -80.85,0 -146.5,-66.12 -146.5,-147.94 0,-81.735 65.65,-148.032 146.5,-148.032 80.93,0 146.53,66.297 146.53,148.032"/>
              <path d="m 1337.51,294.52 c 0,30.464 0,548.859 0,548.859 0,10.422 -8.41,18.941 -18.8,18.941 l -226.51,0 c -10.39,0 -19.69,-10.718 -19.69,-21.136 0,0 0,-660.454 0,-786.352 0,-23.1132 14.4,-29.9804 33.04,-29.9804 0,0 96.68,0 204.08,0 22.39,0 27.88,10.9882 27.88,30.3476 0,42.1524 0,207.2698 0,239.3208"/>
              <path d="m 3868.32,860.531 -225.49,0 c -10.34,0 -18.76,-8.523 -18.76,-19.011 l 0,-583.02 c 0,0 -57.28,-41.91 -138.59,-41.91 -81.3,0 -102.88,36.89 -102.88,116.5 0,79.707 0,508.43 0,508.43 0,10.488 -8.4,19.011 -18.75,19.011 l -228.85,0 c -10.33,0 -18.79,-8.523 -18.79,-19.011 0,0 0,-310.481 0,-546.93 0,-236.4611 131.79,-294.30875 313.09,-294.30875 148.73,0 268.65,82.16795 268.65,82.16795 0,0 5.71,-43.3008 8.29,-48.4375 2.59,-5.1211 9.32,-10.2929 16.59,-10.2929 l 145.59,0.6406 c 10.33,0 18.79,8.539 18.79,18.9804 l -0.07,798.1802 c 0,10.488 -8.43,19.011 -18.82,19.011"/>
              <path d="m 4395.67,217.309 c -78.21,2.382 -131.26,37.871 -131.26,37.871 l 0,376.543 c 0,0 52.34,32.078 116.55,37.812 81.2,7.274 159.44,-17.254 159.44,-210.957 0,-204.258 -35.31,-244.566 -144.73,-241.269 z m 88.94,669.933 c -128.07,0 -215.18,-57.14 -215.18,-57.14 l 0,402.628 c 0,10.5 -8.39,18.97 -18.75,18.97 l -227.87,0 c -10.36,0 -18.78,-8.47 -18.78,-18.97 l 0,-1189.0308 c 0,-10.4883 8.42,-19.0273 18.81,-19.0273 0.02,0 158.05,0 158.1,0 7.12,0 12.51,3.6679 16.49,10.0976 3.93,6.3907 9.6,54.8203 9.6,54.8203 0,0 93.18,-88.30074 269.57,-88.30074 207.08,0 325.84,105.04294 325.84,471.54694 0,366.512 -189.67,414.406 -317.83,414.406"/>
              <path d="m 1990.58,862.426 -170.45,0 c 0,0 -0.26,225.134 -0.26,225.184 0,8.52 -4.39,12.78 -14.24,12.78 l -232.28,0 c -9.03,0 -13.88,-3.97 -13.88,-12.65 l 0,-232.697 c 0,0 -116.4,-28.102 -124.27,-30.371 -7.84,-2.274 -13.61,-9.5 -13.61,-18.125 l 0,-146.227 c 0,-10.515 8.4,-18.996 18.79,-18.996 l 119.09,0 c 0,0 0,-152.941 0,-351.785 0,-261.289 183.28,-286.96088 306.96,-286.96088 56.51,0 124.11,18.15238 135.27,22.27348 6.75,2.4804 10.67,9.4687 10.67,17.0468 l 0.19,160.8636 c 0,10.488 -8.86,18.976 -18.84,18.976 -9.93,0 -35.34,-4.039 -61.5,-4.039 -83.72,0 -112.09,38.93 -112.09,89.317 0,50.351 -0.01,334.308 -0.01,334.308 l 170.46,0 c 10.39,0 18.8,8.481 18.8,18.996 l 0,183.16 c 0,10.497 -8.41,18.946 -18.8,18.946"/>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
     setTimeout(() => {
       this.loadCarbonAds();
     }, 500);
     //this.renderConnectedDots();

    const strings = shuffle(['Express', 'Hapi', 'Meteor', 'React', 'Angular 2', 'Bootstrap', 'Foundation', 'Gulp',
      'Webpack', 'Mocha', 'Jasmine', 'Node.js', 'Jade', 'Handlebars', 'Nunjucks', 'Bourbon Neat', 'Sass', 'LESS',
      'Redux', 'React Router', 'ECMAScript 2015', 'Babel', 'GraphQL', 'Browserify', 'Chai', 'Sinon', 'MongoDB', 'MySQL',
      'PostgreSQL', 'RethinkDB', 'Passport', 'PostCSS', 'Socket.IO', 'Istanbul', 'OAuth 2.0'
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
    script.defer = true;
    script.type = 'text/javascript';
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=sahatyalkabovcom';
    script.id = '_carbonads_js';
    carbonAdsContainer.appendChild(script);
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

  render() {
    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    const isIE = !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = !!window.chrome && !!window.chrome.webstore;

    let demoIcon;

    if (isFirefox) {
      demoIcon = <i className="fa fa-firefox"/>;
    } else if (isIE) {
      demoIcon = <i className="fa fa-internet-explorer"/>;
    } else if (isEdge) {
      demoIcon = <i className="fa fa-edge"/>;
    } else if (isChrome) {
      demoIcon = <i className="fa fa-chrome"/>;
    } else if (isOpera) {
      demoIcon = <i className="fa fa-opera"/>;
    } else if (isSafari) {
      demoIcon = <i className="fa fa-safari"/>;
    } else {
      demoIcon = <i className="fa fa-globe"/>;
    }

    // <img className="hero-arrow hidden-xs" src="/img/arrow.png" alt="Arrow"/>
    // <span>Don't forget to <i className="fa fa-star"/> on GitHub if you liked this project!</span>

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
              <ul className="nav navbar-nav">
                <li><a href="https://github.com/sahat/boilerplate/issues" target="_blank"><i className="fa fa-bug"></i>Report Issues</a></li>
                <li><a href="https://github.com/sahat/boilerplate/blob/master/CONTRIBUTING.md" target="_blank"><i className="fa fa-code-fork"></i>Contributing</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="tweet-button">
                  <a className="twitter-share-button" href="https://twitter.com/intent/tweet" />
                </li>

                <li className="facebook-share-button">
                  <div className="fb-share-button" data-href="http://www.your-domain.com/your-page.html" data-layout="button_count"></div>
                </li>

                <li className="linkedin-button">
                  <script type="IN/Share" data-counter="right"></script>
                </li>

                <li className="plusone-button">
                  <div className="g-plusone" data-size="medium" data-href="http://google.com"></div>
                </li>

                <li>
                  <a href="https://github.com/sahat/boilerplate" className="navbar-icon">
                    {GITHUB_LOGO}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container hero-container">
          <div className="wrapper">
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
              <div>Hand-crafted starter kits with focus on simplicity and ease of use.</div>
            </VelocityComponent>
            <VelocityComponent runOnMount animation="transition.slideUpIn" duration={1200} delay={400}>
              <div className="featuring">
                Featuring <span style={{ color: '#fff' }} ref="heroHeading"/>
              </div>
            </VelocityComponent>
            <a href="#" className="btn btn-outline">{demoIcon} Live Demo</a> <a href="#" className="btn btn-outline">Project Examples</a>
          </div>
          <iframe src="https://ghbtns.com/github-btn.html?user=twbs&repo=bootstrap&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
          <div ref="carbonAds"></div>
        </div>
      </header>
    );
  }
}

export default Header;
