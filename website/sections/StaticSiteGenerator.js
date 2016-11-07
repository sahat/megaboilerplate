import React from 'react';
import cx from 'classnames';

const STATIC_SITE_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 26 26">
    <path d="M 25.15625 0.1875 C 23.885328 0.2454375 20.96425 0.5555 18.0625 2 C 16.8205 2.62 15.58275 3.4505 14.46875 4.5625 C 12.648519 6.3827313 10.066928 9.4736107 7.90625 12.125 L 3.6875 12.0625 C 3.5455 12.0325 3.36325 12.0865 3.28125 12.1875 L 0.90625 15.21875 C 0.82525 15.31675 0.88925 15.43775 1.03125 15.46875 L 4.65625 16.25 C 4.651574 16.342561 4.691676 16.488906 4.78125 16.75 L 4.09375 18.25 C 4.09375 18.25 3.80625 18.74475 5.53125 20.46875 C 7.25525 22.19275 7.75 21.90625 7.75 21.90625 L 9.28125 21.21875 C 9.5673018 21.312365 9.7068625 21.321578 9.78125 21.3125 L 10.5625 25 C 10.5895 25.141 10.7145 25.207 10.8125 25.125 L 13.84375 22.75 C 13.94475 22.67 13.99975 22.48575 13.96875 22.34375 L 13.90625 18.03125 C 16.571535 15.855539 19.672077 13.296113 21.4375 11.53125 C 22.5455 10.42125 23.38 9.1815 24 7.9375 C 25.919 4.0755 25.8125 0.1875 25.8125 0.1875 C 25.8125 0.1875 25.579891 0.1681875 25.15625 0.1875 z M 18 5.9375 C 19.131 5.9375 20.0625 6.869 20.0625 8 C 20.0625 9.131 19.131 10.0625 18 10.0625 C 16.869 10.0625 15.9375 9.131 15.9375 8 C 15.9375 6.869 16.869 5.9375 18 5.9375 z M 2.84375 18.8125 C 2.60375 19.0145 2.357 19.2055 2.125 19.4375 C -0.204 21.7675 0.125 25.875 0.125 25.875 C 0.125 25.875 4.2335 26.205 6.5625 23.875 C 6.7935 23.644 6.9865 23.39525 7.1875 23.15625 C 7.0475 23.08225 6.89075 22.989 6.71875 22.875 C 4.75875 24.378 1.84375 24.15625 1.84375 24.15625 C 1.84375 24.15625 1.622 21.23925 3.125 19.28125 C 3.01 19.10825 2.91775 18.9535 2.84375 18.8125 z"></path>
  </svg>
);

class StaticSiteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const props = this.props;

    let description;

    switch (props.staticSiteGenerator) {
      case 'jekyll':
        description = (
          <div>
            <strong><a href="http://jekyllrb.com/" target="_blank">Jekyll</a></strong> — Simple, blog-aware, static site generator. The engine behind GitHub Pages. (Theme by <a href="https://github.com/vormwald/joon">@vormwald</a>)
          </div>
        );
        break;
      case 'middleman':
        description = (
          <div>
            <strong><a href="https://middlemanapp.com/" target="_blank">Middleman</a></strong> — A static site generator using all the shortcuts and tools in modern web development.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"> </div>;
    }

    let note;

    if (props.staticSiteGenerator) {
      note = (
        <div>
          <strong>Note: </strong>
          <span>Requires <a href="http://rubyinstaller.org/" target="_blank">Ruby 2.0.0</a> or higher.</span>
        </div>
      );
    } else {
      note = <div className="placeholder"> </div>;
    }

    const validationError = props.staticSiteGeneratorValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.staticSiteGeneratorValidationError}</div>
    ) : null;

    if (props.staticSiteGeneratorValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.staticSiteGenerator).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.staticSiteGenerator).velocity('scroll');
      }
    }
    
    return (
      <div ref="staticSiteGenerator" className={cx('zoomInBackwards panel', props.staticSiteGenerator)}>
        <div className="panel-heading">
          <h6>{STATIC_SITE_SVG}{props.staticSiteGenerator || 'Static Site Generator'}</h6>
        </div>
        <div className="panel-body">
          {description}
          <div className="radio-group">
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/jekyll-logo.svg" alt="Jekyll"/>
              <input type="radio" id="jekyllRadio" name="staticSiteGeneratorRadios" value="jekyll" onChange={props.handleChange} checked={props.staticSiteGenerator === 'jekyll'}/>
              <span>Jekyll</span>
            </label>
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/middleman-logo.svg" alt="Middleman"/>
              <input type="radio" id="middlemanRadio" name="staticSiteGeneratorRadios" value="middleman" onChange={props.handleChange} checked={props.staticSiteGenerator === 'middleman'}/>
              <span>Middleman</span>
            </label>
          </div>
          {note}
          {validationError}
        </div>
      </div>
    );
  }
}

export default StaticSiteGenerator;
