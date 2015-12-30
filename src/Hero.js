import React from 'react';
import Slider from 'react-slick';
import Header from './Header';

class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLogo: ''
    }
  }

  componentDidMount() {
    //this.loadCarbonAds();
    this.renderConnectedDots();
  }

  loadCarbonAds() {
    let carbonAdsContainer = this.refs.carbonAds;
    let script = document.createElement('script');
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
      create: function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      },

      animate: function () {

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

      line: function () {
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

    window.onmousemove = function (parameter) {
      mousePosition.x = parameter.pageX;
      mousePosition.y = parameter.pageY;
    };

    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    setInterval(createDots, 1000 / 30);
  }

  render() {
    let settings = {
      arrows: false,
      autoplay: true,
      dots: false,
      fade: true,
      infinite: true,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let slider = (
      <Slider {...settings}>
        <div><img className="hero-logo" src="/img/svg/alt-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/angularjs-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/bootstrap-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/babel-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/css3-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/express-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/facebook-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/eslint-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/flux-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/google-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/grunt-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/gulp-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/handlebars-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/hapi-logo.png"/></div>
        <div><img className="hero-logo" src="/img/svg/jade-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/less-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/sass-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/node-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/mongodb-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/mysql-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/foundation-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/npm-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/passportjs-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/polymer-logo.svg"/></div>
        <div><img className="hero-logo" src="/img/svg/postgresql-logo.svg"/></div>
      </Slider>
    );

    return (
      <div className="hero">
        <canvas ref="connectedDots"></canvas>
        <Header />
        <div className="container">

          <div className="text-center">
            {slider}
          </div>

          <h1>Mega Boilerplate</h1>
          <p className="lead">
            Simple and easy to use hand-crafted starter kits.
            <br />
            <a href="#">View Demo</a>
          </p>
          <iframe src="https://ghbtns.com/github-btn.html?user=sahat&repo=satellizer&type=star&count=true" frameBorder="0" scrolling="0" width="100px" height="20px"></iframe>
          <iframe src="https://ghbtns.com/github-btn.html?user=sahat&type=follow&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe>
          <div>
            <img className="hero-arrow hidden-xs" src="/img/arrow.png" alt="Arrow"/>
            <span>Don't forget to <i className="ion-star" /> on GitHub if you liked this project!</span>
          </div>
          <div ref="carbonAds"></div>
        </div>
      </div>
    );
  }
}

export default Banner;
