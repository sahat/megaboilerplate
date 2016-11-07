import React from 'react';
import cx from 'classnames';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';

const BUILD_TOOL_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 50 50">
    <path d="M 14.34375 1.9375 C 13.87175 1.9375 13.44275 2.289 13.34375 2.75 C 13.24475 3.213 13.5045 3.684 13.9375 3.875 C 13.9755 3.892 17.795 5.61325 22.25 10.28125 C 24.248 12.37425 26.3485 15.14825 24.9375 16.53125 C 24.9045 16.56725 24.74 16.759 24.125 17.375 C 24.068 17.432 24.048 17.47525 24 17.53125 L 23.96875 17.5625 L 31.625 25.21875 L 32.34375 24.53125 C 32.35875 24.51725 32.362 24.48375 32.375 24.46875 L 33.5 23.34375 C 33.551 23.39375 33.82725 23.671 34.90625 24.75 C 35.31225 25.156 35.21675 26.16125 35.09375 26.40625 C 34.71875 27.15725 34.79025 27.9465 35.28125 28.4375 C 35.47625 28.6335 38.75 31.90625 38.75 31.90625 C 39.289 32.44525 40.00875 32.71875 40.71875 32.71875 C 41.42775 32.71875 42.11525 32.44525 42.65625 31.90625 L 48.1875 26.40625 C 49.2685 25.32625 49.2675 23.54975 48.1875 22.46875 L 44.71875 19 C 44.21475 18.495 43.4575 18.38975 42.8125 18.71875 C 42.5095 18.87275 41.4395 18.97175 41.0625 18.59375 L 39.625 17.15625 C 39.952 16.69025 40.128 16.1395 40.125 15.5625 C 40.128 14.8155 39.8385 14.11675 39.3125 13.59375 L 35.5625 9.84375 C 35.5415 9.82275 35.4755 9.781 35.4375 9.75 L 34.65625 8.96875 C 33.02225 7.33475 31.513 5.79225 31.125 5.40625 C 27.811 2.09025 15.71175 1.9415 14.34375 1.9375 z M 22.5625 18.96875 L 3 38.53125 C 1.921 39.60925 1.921 41.3545 3 42.4375 L 6.75 46.1875 C 7.29 46.7275 8.00975 47 8.71875 47 C 9.42775 47 10.11625 46.7275 10.65625 46.1875 L 30.21875 26.65625 L 22.5625 18.96875 z"></path>
  </svg>
);

class BuildTool extends React.Component {
  render() {
    const props = this.props;
    let description;

    switch (props.buildTool) {
      case 'gulp':
        description = (
          <div>
            <strong><a href="http://gulpjs.com/" target="_blank">Gulp</a></strong> — The streaming build system.
            <strong> <a href="http://browserify.org/">Browserify</a></strong> — Lets you <code>require('modules')</code> in
            the browser by bundling up all of your dependencies.
          </div>
        );
        break;
      case 'webpack':
        description = (
          <div>
            <strong><a href="https://webpack.github.io/" target="_blank">Webpack</a></strong> — A module bundler that
            bundles javascript and other assets for the browser.
          </div>
        );
        break;
      case 'npm':
        description = (
          <div>
            <strong><a href="https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0#.fmqbzcm1v" target="_blank">NPM</a></strong>
            — A build process using only <a href="https://docs.npmjs.com/cli/npm">npm</a> and your <em>package.json</em> file.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"> </div>;
    }

    let reactNote;

    if (props.buildTool && props.buildTool === 'none' && props.jsFramework === 'react') {
      reactNote = (
        <p>
          <img className="info-icon" src="https://megaboilerplate.blob.core.windows.net/megaboilerplate/img/svg/info.svg" alt="Note"/>
          <span>React <a href="https://www.smashingmagazine.com/2015/04/react-to-the-future-with-isomorphic-apps/#isomorphic-javascript" target="_blank">server-side rendering</a> is enabled only when using a build tool.</span>
        </p>
      );
    }

    let cssPreprocessorNote;

    if (props.buildTool && (props.buildTool === 'none' || props.buildTool === 'webpack')) {
      switch (props.cssPreprocessor) {
        case 'sass':
          cssPreprocessorNote = (
            <div>
              <img className="info-icon" src="/img/svg/info.svg" alt="Note"/>
              <span>Sass will be compiled via <a href="https://github.com/sass/node-sass-middleware" target="_blank">node-sass-middleware</a> package.</span>
            </div>
          );
          break;
        case 'less':
          cssPreprocessorNote = (
            <div>
              <img className="info-icon" src="/img/svg/info.svg" alt="Note"/>
              <span>LESS will be compiled via <a href="https://github.com/emberfeather/less.js-middleware" target="_blank">less.js-middleware</a> package.</span>
            </div>
          );
          break;
        case 'postcss':
          cssPreprocessorNote = (
            <div>
              <img className="info-icon" src="/img/svg/info.svg" alt="Note"/>
              <span>PostCSS will be compiled via <a href="https://github.com/jedmao/postcss-middleware" target="_blank">postcss-middleware</a> package.</span>
            </div>
          );
          break;
        case 'stylus':
          cssPreprocessorNote = (
            <div>
              <img className="info-icon" src="/img/svg/info.svg" alt="Note"/>
              <span>Stylus will be compiled via <a href="https://github.com/dogancelik/express-stylus" target="_blank">express-stylus</a> package.</span>
            </div>
          );
          break;
        default:
          break;
      }
    }

    const NO_FRAMEWORK = props.jsFramework === 'none';
    const REACT = props.jsFramework === 'react';
    const ANGULARJS = props.jsFramework === 'angularjs';
    const CSS = props.cssPreprocessor === 'css';
    const POSTCSS = props.cssPreprocessor !== 'postcss';

    const recommended = props.beginner ? (
      <span className="hint--top hint--rounded" data-hint="Recommended">
        <img src="/img/svg/recommended.svg" alt="Recommended" />
      </span>
    ) : null;

    const noneRadio = NO_FRAMEWORK || ANGULARJS ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/none.png" alt="None"/>
        <input type="radio" name="buildToolRadios" value="none" onChange={props.handleChange} checked={props.buildTool === 'none'}/>
        <span>None</span>
      </label>
    ) : null;

    const gulpRadio = !CSS || ANGULARJS || REACT ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/gulp-logo.svg" alt="Gulp + Browserify"/>
        <input type="radio" name="buildToolRadios" value="gulp" onChange={props.handleChange} checked={props.buildTool === 'gulp'}/>
        <span>Gulp + Browserify</span>
      </label>
    ) : null;

    const webpackRadio =  REACT ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/webpack-logo.svg" alt="Webpack"/>
        <input type="radio" name="buildToolRadios" value="webpack" onChange={props.handleChange} checked={props.buildTool === 'webpack'}/>
        <span>Webpack</span>
      </label>
    ) : null;

    const npmRadio = !ANGULARJS && (!CSS || !POSTCSS || REACT) ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/npm-logo.svg" alt="NPM"/>
        <input type="radio" name="buildToolRadios" value="npm" onChange={props.handleChange} checked={props.buildTool === 'npm'}/>
        <span>NPM</span>
        {recommended}
      </label>
    ) : null;

    const validationError = props.buildToolValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.buildToolValidationError}</div>
    ) : null;

    if (props.buildToolValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.buildTool).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.buildTool).velocity('scroll');
      }
    }
    
    return (
      <div ref="buildTool" className={cx('zoomInBackwards panel', props.buildTool)}>
        <div className="panel-heading">
          <h6>{BUILD_TOOL_SVG}{!props.buildTool || props.buildTool === 'none' ? 'Build Tool' : props.buildTool}</h6>
        </div>
        <div className="panel-body">
          {description}
          <div className="radio-group">
            {noneRadio}
            {gulpRadio}
            {webpackRadio}
            {npmRadio}
          </div>
          {validationError}
          <VelocityTransitionGroup enter={{ animation: 'transition.slideRightIn' }}>{reactNote}</VelocityTransitionGroup>
          <VelocityTransitionGroup enter={{ animation: 'transition.slideLeftIn' }}>{cssPreprocessorNote}</VelocityTransitionGroup>
        </div>
      </div>
    );
  }
}

export default BuildTool;
