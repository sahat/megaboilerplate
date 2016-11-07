import React from 'react';
import cx from 'classnames';

const TESTING_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
    <path d="M 18.5 2 C 17.1 2 16 3.1 16 4.5 C 16 5.7 16.9 6.70625 18 6.90625 L 18 40.90625 C 18 44.80625 21.1 47.90625 25 47.90625 C 28.9 47.90625 32 44.80625 32 40.90625 L 32 6.90625 C 33.1 6.70625 34 5.7 34 4.5 C 34 3.1 32.9 2 31.5 2 L 18.5 2 z M 18.5 4 L 31.5 4 C 31.8 4 32 4.2 32 4.5 C 32 4.8 31.8 5 31.5 5 L 31 5 L 30 5 L 23 5 L 23 7 L 30 7 L 30 13 L 20 13 L 20 7 L 21 7 L 21 5 L 20 5 L 19 5 L 18.5 5 C 18.2 5 18 4.8 18 4.5 C 18 4.2 18.2 4 18.5 4 z M 26 21 C 27.1 21 28 21.9 28 23 C 28 24.1 27.1 25 26 25 C 24.9 25 24 24.1 24 23 C 24 21.9 24.9 21 26 21 z M 23.5 31 C 24.3 31 25 31.7 25 32.5 C 25 33.3 24.3 34 23.5 34 C 22.7 34 22 33.3 22 32.5 C 22 31.7 22.7 31 23.5 31 z" overflow="visible"></path>
  </svg>
);

class Testing extends React.Component {
  render() {
    const props = this.props;

    let description;

    switch (props.testing) {
      case 'mocha':
        description = (
          <div>
            <strong><a href="https://mochajs.org/" target="_blank">Mocha</a></strong> — Simple, flexible, fun javascript test framework. <strong><a href="http://chaijs.com/" target="_blank">Chai</a></strong> — A BDD / TDD assertion library. <strong><a href="http://sinonjs.org/" target="_blank">Sinon</a></strong> — Test spies, stubs and mocks.
          </div>
        );
        break;
      case 'jasmine':
        description = (
          <div>
            <strong><a href="http://jasmine.github.io/edge/introduction.html" target="_blank">Jasmine</a></strong> — A BDD framework for testing JavaScript code. It does not depend on any other JavaScript frameworks.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"> </div>;
    }

    let note;

    if (props.testing === 'mocha') {
      note = (
        <div>
          <strong>Note: </strong>
          <span>Mocha comes bundled with <a href="http://chaijs.com/" target="_blank">Chai</a> and <a href="http://sinonjs.org/" target="_blank">Sinon</a> for complete testing experience.</span>
        </div>
      );
    } else {
      note = <div className="placeholder"> </div>;
    }

    const mochaRadio = (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/mocha.svg" alt="Mocha"/>
        <input type="radio" name="testingRadios" value="mocha" onChange={props.handleChange} checked={props.testing === 'mocha'}/>
        <span>Mocha</span>
      </label>
    );

    const jasmineRadio = props.jsFramework === 'angularjs' ? (
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/jasmine.svg" alt="Jasmine"/>
        <input type="radio" name="testingRadios" value="jasmine" onChange={props.handleChange} checked={props.testing === 'jasmine'}/>
        <span>Jasmine</span>
      </label>
    ) : (
      <label className="radio-inline hint--top hint--rounded" data-hint="Coming soon">
        <img className="btn-logo disabled" src="/img/svg/jasmine.svg" alt="Jasmine"/>
        <input type="radio" name="testingRadios" value="jasmine" onChange={props.handleChange} checked={props.testing === 'jasmine'} disabled/>
        <span>Jasmine</span>
      </label>
    );

    const validationError = props.testingValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.testingValidationError}</div>
    ) : null;

    if (props.testingValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.testing).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.testing).velocity('scroll');
      }
    }

    return (
      <div ref="testing" className={cx('zoomInBackwards panel', props.testing)}>
        <div className="panel-heading">
          <h6>{TESTING_SVG}{!props.testing || props.testing === 'none' ? 'Unit Testing' : props.testing}</h6>
        </div>
        <div className="panel-body">
          {description}
          <div className="radio-group">
            <label className="radio-inline">
              <img className="btn-logo" src="/img/svg/none.png" alt="None"/>
              <input type="radio" name="testingRadios" value="none" onChange={props.handleChange} checked={props.testing === 'none'}/>
              <span>None</span>
            </label>
            {mochaRadio}
            {jasmineRadio}
          </div>
          {validationError}
          {note}
        </div>
      </div>
    );
  }
}

export default Testing;
