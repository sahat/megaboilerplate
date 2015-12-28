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
  }

  loadCarbonAds() {
    let carbonAdsContainer = this.refs.carbonAds;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=sahatyalkabovcom';
    script.id = '_carbonads_js';
    carbonAdsContainer.appendChild(script);
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
        <Header />
        <div className="container">

          <div className="text-center">
          </div>

          <h1>Mega Boilerplate</h1>
          <p className="lead">
            Clean, simple and easy to use hand-crafted project starters.
            <br />
            Inspired by <a href="https://github.com/sahat/hackathon-starter">Hackathon Starter</a>.
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
