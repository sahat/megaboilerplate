import React from 'react';

class Banner extends React.Component {

  componentDidMount() {
    this.loadCarbonAds();
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
    return (
      <div className="hero">
        <div className="container">
          <span className="text-center bd-booticon outline">B</span>
          <h1>Mega Boilerplate</h1>
          <p className="lead">An overview of Bootstrap, how to download and use, basic
            templates and examples, and more.</p>
          <div ref="carbonAds"></div>
        </div>
      </div>
    );
  }
}

export default Banner;
