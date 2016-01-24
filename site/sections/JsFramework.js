import React from 'react';
import cx from 'classnames';

const JS_FRAMEWORK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 50 50">
    <path d="M 29.125 7.34375 L 17.125 41.34375 L 20.875 42.65625 L 32.875 8.65625 L 29.125 7.34375 z M 9.9375 13.375 L 1.25 23.71875 L 0.1875 25 L 1.25 26.28125 L 9.9375 36.65625 L 13.03125 34.09375 L 5.40625 25 L 13 15.9375 L 9.9375 13.375 z M 40.0625 13.375 L 37 15.9375 L 44.59375 25 L 37 34.0625 L 40.09375 36.625 L 48.71875 26.28125 L 49.78125 25 L 48.71875 23.71875 L 40.0625 13.375 z" color="#000" overflow="visible"></path>
  </svg>
);

const REACT_HOT_LOADER_SVG = (
  <svg version="1.1" x="0px" y="0px" height="50" viewBox="0 0 400 400">
    <circle fill="rgba(0, 216, 255, .5)" cx="200" cy="200" r="139"></circle>
    <path fill="none" stroke="#FFFFFF" strokeWidth="4" d="M231.7,200c0,17.4-1.7,88-31.7,88s-31.7-70.6-31.7-88s1.7-88,31.7-88S231.7,182.6,231.7,200z"></path>
    <path fill="none" stroke="#FFFFFF" strokeWidth="4" d="M216.1,227.7c-15,8.9-76.6,43.4-91.9,17.6s44.6-63.2,59.6-72.1s76.6-43.4,91.9-17.6S231.1,218.8,216.1,227.7z"></path>
    <path fill="none" stroke="#FFFFFF" strokeWidth="4" d="M183.9,227.7c15,8.9,76.6,43.4,91.9,17.6s-44.6-63.2-59.6-72.1s-76.6-43.4-91.9-17.6S168.9,218.8,183.9,227.7z"></path>
    <circle fill="#FFFFFF" cx="200" cy="200" r="16"></circle>
  </svg>
);

const JsFramework = (props) => {
  let reactOptions = (props.jsFramework === 'react') ? (
    <div className="fadeIn animated">
      <h5 className="subcategory">React Features</h5>
      <label className="checkbox-inline">
        <img className="btn-logo" src="/img/svg/flux-logo.svg" alt="Redux" />
        <input type="checkbox" name="reactOptionsCheckboxes" value="redux" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('redux')} /> Redux
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/react-router-logo.png" alt="React Router" />
        <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('reactRouter')} /> React Router
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/relay-logo.svg" alt="Relay" />
        <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('graphql')} /> GraphQL + Relay
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/babel-logo.png" alt="Babel" />
        <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('es6')} /> ES6
      </label>
      <label className="radio-inline">
        <span className="btn-logo">{REACT_HOT_LOADER_SVG}</span>
        <input type="checkbox" name="reactOptionsCheckboxes" value="hotReload" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('hotReload')} /> Hot Reload
      </label>

    </div>
  ) : null;

  return (
    <div className={cx('animated fadeIn panel', props.jsFramework)}>
      <div className="panel-heading">
        <h6>{JS_FRAMEWORK_SVG} {!props.jsFramework || props.jsFramework === 'none' ? 'JavaScript Framework' : props.jsFramework}</h6>
      </div>
      <div className="panel-body">
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="jsFrameworkRadios" value="none" onChange={props.handleChange} checked={props.jsFramework === 'none'} /> None
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/react-logo.svg" />
          <input type="radio" name="jsFrameworkRadios" value="react" onChange={props.handleChange} checked={props.jsFramework === 'react'} /> React
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/angularjs-logo.png" />
          <input type="radio" name="jsFrameworkRadios" value="angular" onChange={props.handleChange} checked={props.jsFramework === 'angular'} /> AngularJS
        </label>

        <ul className="nav nav-stacked">
          <li>
            <a data-toggle="collapse" href="#jsFrameworkCollapse1">
              <i className="ion-help-circled"/> Should I use a client-side JavaScript Framework at all?
            </a>
            <div id="jsFrameworkCollapse1" className="collapse">
              <div className="panel-collapse">
                Select <strong>None</strong> if you are building an API server or a single-page application.
              </div>
            </div>
          </li>
          <li>
            <a data-toggle="collapse" href="#jsFrameworkCollapse2">
              <i className="ion-help-circled"/> Single Page Application: Advantages and Disadvantages
            </a>
            <div id="jsFrameworkCollapse2" className="collapse">
              <div className="panel-collapse">
                Select <strong>None</strong> if you are building an API server or a single-page application.
              </div>
            </div>
          </li>
          <li>
            <a data-toggle="collapse" href="#jsFrameworkCollapse3">
              <i className="ion-help-circled"/> React vs Angular?
            </a>
            <div id="jsFrameworkCollapse3" className="collapse">
              <div className="panel-collapse">
                Select <strong>None</strong> if you are building an API server or a single-page application.
              </div>
            </div>
          </li>
        </ul>

        {reactOptions}
      </div>
    </div>
  );
};

export default JsFramework;
