import React from 'react';
import cx from 'classnames';
import { VelocityComponent } from 'velocity-react';

const JS_FRAMEWORK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 50 50">
    <path d="M 29.125 7.34375 L 17.125 41.34375 L 20.875 42.65625 L 32.875 8.65625 L 29.125 7.34375 z M 9.9375 13.375 L 1.25 23.71875 L 0.1875 25 L 1.25 26.28125 L 9.9375 36.65625 L 13.03125 34.09375 L 5.40625 25 L 13 15.9375 L 9.9375 13.375 z M 40.0625 13.375 L 37 15.9375 L 44.59375 25 L 37 34.0625 L 40.09375 36.625 L 48.71875 26.28125 L 49.78125 25 L 48.71875 23.71875 L 40.0625 13.375 z" overflow="visible"></path>
  </svg>
);

class JsFramework extends React.Component {
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
    let description;

    switch (props.jsFramework) {
      case 'react':
        description = (
          <div>
            <strong><a href="https://facebook.github.io/react/" target="_blank">React</a></strong> — A Library for building UIs. Advantages: simple, declarative, composable components, Virtual DOM, one-way reactive data-flow.
          </div>
        );
        break;
      case 'angular':
        description = (
          <div>
            <strong><a href="https://angular.io/" target="_blank">Angular 2</a></strong> — A JavaScript framework for building web apps. Advantages: feature-rich, big community, two-way data binding, MVC architecture.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"></div>;
    }

    const additionalOptions = (state.showOptions && props.jsFramework === 'react') ? (
      <div>
        <VelocityComponent runOnMount animation="transition.slideUpIn" duration={700}>
          <div className="checkbox transparent">
            <label className="hint--right hint--rounded" data-hint="A live-editing time travel environment for Redux.">
              <input type="checkbox" name="reactOptionsCheckboxes" value="reduxDevTools" onChange={props.handleChange} checked={props.reactOptions && props.reactOptions.has('reduxDevTools')}/>
              <span>Redux Dev Tools</span>
            </label>
          </div>
        </VelocityComponent>
      </div>
    ) : null;

    const additionalOptionsButton = (props.jsFramework === 'react') ? (
      <div>
        <br/>
        <span className="options" onClick={this.toggleAdditionalOptions}>
          <img className={cx('animated', { fast: state.showOptions })} src="/img/svg/options.svg"/>
          <span>React Options</span>
        </span>
        {additionalOptions}
      </div>
    ) : null;

    const recommended = props.beginner ? (
      <span className="hint--top hint--rounded" data-hint="Recommended">
        <img src="/img/svg/recommended.svg" alt="Recommended"/>
      </span>
    ) : null;

    let note;

    if (props.jsFramework === 'react') {
      note = (
        <div>
          <strong>Note: </strong>
          <span>React app comes with  <a href="http://babeljs.io/">Babel</a>, <a href="http://redux.js.org/" target="_blank">Redux</a>, <a href="https://github.com/reactjs/react-router" target="_blank">React
            Router</a> and server-side rendering.</span>
        </div>
      );
    } else {
      note = <div className="placeholder"> </div>;
    }

    const validationError = props.jsFrameworkValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.jsFrameworkValidationError}</div>
    ) : null;

    if (props.jsFrameworkValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.jsFramework).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.jsFramework).velocity('scroll');
      }
    }

    return (
      <div ref="jsFramework" className={cx('zoomInBackwards panel', props.jsFramework)}>
        <div className="panel-heading">
          <h6>{JS_FRAMEWORK_SVG}{!props.jsFramework || props.jsFramework === 'none' ? 'JavaScript Framework' : props.jsFramework}</h6>
        </div>
        <div className="panel-body">
          {description}
          <div className="radio-group">
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/none.png" alt="None"/>
              <input type="radio" name="jsFrameworkRadios" value="none" onChange={props.handleChange} checked={props.jsFramework === 'none'}/>
              <span>None</span>
              {recommended}
            </label>
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/react-logo.svg" alt="React"/>
              <input type="radio" name="jsFrameworkRadios" value="react" onChange={props.handleChange} checked={props.jsFramework === 'react'}/>
              <span>React</span>
            </label>
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/angularjs-logo.svg" alt="AngularJS"/>
              <input type="radio" name="jsFrameworkRadios" value="angularjs" onChange={props.handleChange} checked={props.jsFramework === 'angularjs'}/>
              <span>AngularJS</span>
            </label>
            <label className="radio-inline hint--right hint--rounded" data-hint="ETA after Angular 2 final release">
              <img className="btn-logo disabled" src="/img/svg/angular2.png" alt="Angular 2"/>
              <input type="radio" name="jsFrameworkRadios" value="angular2" disabled/>
              <span>Angular 2</span>
            </label>
          </div>
          {validationError}
          {note}
          {additionalOptionsButton}
        </div>
      </div>
    );
  }
}

export default JsFramework;
