import React from 'react';
import cx from 'classnames';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';

const CSS_PREPROCESSOR_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 26 26">
    <path d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25 C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M8.468,15.221c0.433,0,0.881-0.087,1.169-0.226 c0.062-0.031,0.146-0.033,0.214-0.003c0.066,0.03,0.116,0.09,0.136,0.162l0.163,0.623c0.03,0.115-0.026,0.235-0.132,0.286 c-0.301,0.152-0.911,0.315-1.713,0.315c-1.973,0-3.248-1.304-3.248-3.32c0-2.024,1.406-3.438,3.419-3.438 c0.909,0,1.421,0.229,1.556,0.299c0.106,0.056,0.158,0.179,0.124,0.294l-0.189,0.638c-0.021,0.071-0.073,0.131-0.141,0.158 c-0.057,0.026-0.145,0.027-0.211-0.007c-0.298-0.144-0.694-0.224-1.112-0.224c-1.326,0-2.118,0.842-2.118,2.252 C6.386,14.402,7.165,15.221,8.468,15.221z M13.13,16.379c-0.614,0-1.308-0.177-1.688-0.429c-0.093-0.063-0.133-0.177-0.101-0.281 l0.198-0.656c0.022-0.075,0.079-0.136,0.15-0.163c0.087-0.029,0.158-0.018,0.222,0.023c0.363,0.224,0.839,0.357,1.271,0.357 c0.638,0,1.019-0.294,1.019-0.785c0-0.385-0.156-0.654-0.983-0.974c-1.202-0.425-1.763-1.046-1.763-1.952 c0-1.118,0.91-1.898,2.213-1.898c0.765,0,1.246,0.207,1.464,0.331c0.104,0.058,0.152,0.183,0.114,0.297l-0.216,0.639 c-0.024,0.07-0.078,0.125-0.146,0.152c-0.068,0.026-0.148,0.021-0.211-0.013c-0.215-0.117-0.567-0.258-1.032-0.258 c-0.66,0-0.894,0.355-0.894,0.66c0,0.359,0.157,0.592,1.046,0.937c1.198,0.463,1.708,1.065,1.708,2.017 C15.505,15.304,14.883,16.379,13.13,16.379z M18.567,16.379c-0.614,0-1.308-0.177-1.688-0.429c-0.093-0.063-0.133-0.177-0.101-0.281 l0.198-0.656c0.022-0.075,0.079-0.136,0.15-0.163c0.089-0.03,0.16-0.017,0.222,0.024c0.363,0.223,0.838,0.356,1.271,0.356 c0.639,0,1.02-0.294,1.02-0.785c0-0.385-0.156-0.654-0.983-0.974c-1.201-0.425-1.763-1.046-1.763-1.952 c0-1.118,0.91-1.898,2.213-1.898c0.765,0,1.246,0.207,1.465,0.331c0.104,0.058,0.152,0.183,0.113,0.297l-0.215,0.639 c-0.025,0.07-0.078,0.125-0.146,0.152c-0.067,0.027-0.147,0.023-0.211-0.013c-0.215-0.117-0.568-0.258-1.033-0.258 c-0.659,0-0.893,0.355-0.893,0.66c0,0.359,0.156,0.592,1.046,0.937c1.198,0.463,1.708,1.065,1.708,2.017 C20.941,15.304,20.32,16.379,18.567,16.379z"></path>
  </svg>
);

const capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

class CssPreprocessor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleAdditionalOptions = this.toggleAdditionalOptions.bind(this);
  }

  toggleAdditionalOptions() {
    this.setState({ showOptions: !this.state.showOptions });
  }

  render() {
    const props = this.props;
    const state = this.state;

    const JEKYLL = props.staticSiteGenerator === 'jekyll';
    const MIDDLEMAN = props.staticSiteGenerator === 'middleman';

    const NO_CSS_FRAMEWORK = props.cssFramework === 'none';
    const BOOTSTRAP = props.cssFramework === 'bootstrap';
    const FOUNDATION = props.cssFramework === 'foundation';
    const BOURBON_NEAT = props.cssFramework === 'bourbonNeat';

    const CSS = props.cssPreprocessor === 'css';
    const SASS = props.cssPreprocessor === 'sass';
    const LESS = props.cssPreprocessor === 'less';
    const POSTCSS = props.cssPreprocessor === 'postcss';
    const STYLUS = props.cssPreprocessor === 'stylus';

    const recommended = props.beginner ? (
      <span className="hint--top hint--rounded" data-hint="Recommended">
        <img src="/img/svg/recommended.svg" alt="Recommended" />
      </span>
    ) : null;

    const cssRadio = (!BOURBON_NEAT && (NO_CSS_FRAMEWORK || JEKYLL || MIDDLEMAN || BOOTSTRAP || FOUNDATION)) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/css3-logo.svg" alt="CSS"/>
        <input type="radio" name="cssPreprocessorRadios" value="css" onChange={props.handleChange} checked={CSS} />
        <span>None / CSS</span>
        {recommended}
      </label>
    ) : null;

    const sassRadio = (NO_CSS_FRAMEWORK || JEKYLL || MIDDLEMAN || BOOTSTRAP || FOUNDATION || BOURBON_NEAT) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/sass-logo.svg" alt="Sass"/>
        <input type="radio" name="cssPreprocessorRadios" value="sass" onChange={props.handleChange} checked={SASS} />
        <span>Sass</span>
      </label>
    ) : null;

    const lessRadio = (!JEKYLL && !MIDDLEMAN && (NO_CSS_FRAMEWORK || BOOTSTRAP)) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/less-logo.svg" alt="LESS"/>
        <input type="radio" name="cssPreprocessorRadios" value="less" onChange={props.handleChange} checked={LESS} />
        <span>LESS</span>
      </label>
    ) : null;

    const postcssRadio = (!JEKYLL && !MIDDLEMAN && (NO_CSS_FRAMEWORK)) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/postcss.svg" alt="PostCSS"/>
        <input type="radio" name="cssPreprocessorRadios" value="postcss" onChange={props.handleChange} checked={POSTCSS} />
        <span>PostCSS</span>
      </label>
    ) : null;

    const stylusRadio = (!JEKYLL && !MIDDLEMAN && (NO_CSS_FRAMEWORK)) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/stylus-logo.svg" alt="Stylus"/>
        <input type="radio" name="cssPreprocessorRadios" value="stylus" onChange={props.handleChange} checked={STYLUS} />
        <span>Stylus</span>
      </label>
    ) : null;

    const minifiedCssAdditionalOption = CSS ? (
      <VelocityComponent runOnMount animation="transition.slideUpIn" duration={700}>
        <div className="checkbox transparent">
          <label className="hint--right hint--rounded" data-hint={props.cssFramework + '.min.css'}>
            <input type="checkbox" name="cssPreprocessorOptionsCheckboxes" value="minifiedCss" onChange={props.handleChange}/>
            <span>Minified CSS</span>
          </label>
        </div>
      </VelocityComponent>
    ) : null;

    const additionalOptions = state.showOptions ? (
      <div>
        {minifiedCssAdditionalOption}
        <VelocityComponent runOnMount animation="transition.slideUpIn" duration={700} delay={100}>
          <div className="checkbox transparent">
            <label className="hint--right hint--rounded" data-hint={props.cssFramework + '.min.js'}>
              <input type="checkbox" name="cssPreprocessorOptionsCheckboxes" value="minifiedJs" onChange={props.handleChange}/>
              <span>Minified JS</span>
            </label>
          </div>
        </VelocityComponent>
      </div>
    ) : null;

    const additionalOptionsButton = (BOOTSTRAP || FOUNDATION) && (CSS || LESS || SASS) ? (
      <div>
        <span className="options" onClick={this.toggleAdditionalOptions}>
          <img className={cx('animated', { fast: state.showOptions })} src="/img/svg/options.svg"/>
          <span>{capitalize(props.cssFramework)} Options</span>
        </span>
        {additionalOptions}
      </div>
    ) : null;

    const validationError = props.cssPreprocessorValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.cssPreprocessorValidationError}</div>
    ) : null;

    if (props.cssPreprocessorValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.cssPreprocessor).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.cssPreprocessor).velocity('scroll');
      }
    }

    return (
      <div ref="cssPreprocessor" className={cx('zoomInBackwards panel', props.cssPreprocessor)}>
        <div className="panel-heading">
          <h6>{CSS_PREPROCESSOR_SVG}{!props.cssPreprocessor || props.cssPreprocessor === 'css' ? 'CSS Preprocessor' : props.cssPreprocessor}</h6>
        </div>
        <div className="panel-body">
          <div className="radio-group">
            {cssRadio}
            {sassRadio}
            {lessRadio}
            {postcssRadio}
            {stylusRadio}
          </div>
          <VelocityTransitionGroup enter={{ animation: 'transition.fadeIn', duration: 1000 }}>
            {additionalOptionsButton}
          </VelocityTransitionGroup>
          {validationError}
        </div>
      </div>
    );
  }
}

export default CssPreprocessor;
