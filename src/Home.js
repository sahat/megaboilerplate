/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');
let cx = require('classnames');
let base64url = require('base64-url');
import React from 'react';
import ReactDOM from 'react-dom';
import {isArray, forOwn, clone} from 'lodash';
import { createHistory, useQueries } from 'history';

import InlineSvg from './InlineSvg';

import Platform from './sections/Platform';
import Framework from './sections/Framework';
import TemplateEngine from './sections/TemplateEngine';
import CssFramework from './sections/CssFramework';
import CssPreprocessor from './sections/CssPreprocessor';
import Database from './sections/Database';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  componentDidUpdate() {
    $(ReactDOM.findDOMNode(this)).find('[data-toggle="popover"]').popover({ trigger: 'hover' });
  }

  componentDidMount() {

  }

  clickDownload() {
    let state = this.state;
    let downloadBtn = this.refs.downloadBtn;
    //$(downloadBtn).attr('disabled', 'disabled');


    // Google Analytics event
    //ga("send","event","Customize","Download","Customize and Download")


    //$.when(
    //  generateCSS(preamble),
    //  generateJS(preamble),
    //  generateFonts()
    //).done(function (css, js, fonts) {
    //  generateZip(css, js, fonts, configJson, function(blob) {
    //    $(downloadBtn).removeAttr('disabled');
    //    setTimeout(function () {
    //      saveAs(blob, 'bootstrap.zip')
    //    }, 0)
    //  })
    //});

    let data = clone(state);
    data.appName = haikunate({ tokenLength: 0 });
    data.authentication = Array.from(data.authentication);

    $.ajax({
        url: '/download',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .success((response, status, request) => {
        $(downloadBtn).removeAttr('disabled');

        var disp = request.getResponseHeader('Content-Disposition');
        if (disp && disp.search('attachment') != -1) {
          var form = $('<form method="POST" action="/download">');
          $.each(data, function(k, v) {
            form.append($('<input type="hidden" name="' + k +
              '" value="' + v + '">'));
          });
          $('body').append(form);
          form.submit();
        }
      });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let isChecked = e.target.checked;
    let state = clone(this.state);

    switch (name) {
      case 'platformRadios':
        // Reset everything
        for (let key in state) {
          if (state.hasOwnProperty(key) ) {
            state[key] = null;
          }
        }
        state.platform = value;
        break;

      case 'frameworkRadios':
        state.framework = value;
        break;

      case 'templateEngineRadios':
        state.templateEngine = value;
        break;

      case 'cssFrameworkRadios':
        // Reset CSS Preprocessor and CSS Build Options
        state.cssPreprocessor = null;
        state.cssBuildOptions = null;
        state.cssFramework = value;
        break;

      case 'cssPreprocessorRadios':
        // Clear CSS Build Options for plain vanilla CSS
        if (value === 'css') {
          state.cssBuildOptions = null;
        }
        state.cssPreprocessor = value;
        break;

      case 'cssBuildOptionsRadios':
        state.cssBuildOptions = value;
        break;

      case 'databaseRadios':
        if (value === 'none' && state.authentication) {
          state.authentication.clear();
          state.authentication.add('none');
        }
        state.database = value;
        break;

      case 'authenticationCheckboxes':
        state.authentication = state.authentication || new Set();
        if (isChecked) {
          if (value === 'none') {
            state.authentication.clear();
          } else {
            state.authentication.add(value);
          }
        } else {
          state.authentication.delete(value);
        }
        break;

      case 'jsFrameworkRadios':
        state.jsFramework = value;
        break;

      case 'reactOptionsCheckboxes':
        state.reactOptions = state.reactOptions || new Set();
        if (isChecked) {
          state.reactOptions.add(value);
        } else {
          state.reactOptions.delete(value);
        }
        break;

      case 'reactBuildSystemRadios':
        state.reactBuildSystem = value;
        break;

      case 'deploymentRadios':
        state.deployment = value;
        break;
    }

   this.setState(state);
  }

  handleThemeClick(theme) {
    let state = this.state;
    state.theme = theme;
    this.setState(state);
  }

  render() {
    let state = this.state;


    let platform = <Platform platform={state.platform} handleChange={this.handleChange} />;

    let framework = state.platform ? (
      <Framework platform={state.platform} framework={state.framework} handleChange={this.handleChange} />
    ) : null;

    let templateEngine = state.framework ? (
      <TemplateEngine platform={state.platform} templateEngine={state.templateEngine} handleChange={this.handleChange} />
    ) : null;

    let cssFramework = state.templateEngine ? (
      <CssFramework cssFramework={state.cssFramework} handleChange={this.handleChange} />
    ) : null;

    let cssPreprocessor = state.cssFramework ? (
      <CssPreprocessor cssPreprocessor={state.cssPreprocessor} cssFramework={state.cssFramework} handleChange={this.handleChange} />
    ) : null;



    let database = state.cssPreprocessor ? (
      <Database database={state.database} handleChange={this.handleChange} />
    ) : null;

    let authenticationCheckboxes = state.database === 'none' ? (
      <div className="alert alert-info">
        <strong>Important!</strong> To enable authentication you must choose a database.
      </div>
    ) : (
      <div>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="checkbox" name="authenticationCheckboxes" value="none" onChange={this.handleChange} checked={state.authentication && state.authentication.size === 0} disabled={state.database === 'none'} /> None
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/email-logo.svg" height="60" />
          <input type="checkbox" name="authenticationCheckboxes" value="email" onChange={this.handleChange} checked={state.authentication && state.authentication.has('email')} disabled={state.database === 'none'} /> Email & Password
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/facebook-logo.svg" />
          <input type="checkbox" name="authenticationCheckboxes" value="facebook" onChange={this.handleChange} checked={state.authentication && state.authentication.has('facebook')} disabled={state.database === 'none'} /> Facebook
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/google-logo.svg" />
          <input type="checkbox" name="authenticationCheckboxes" value="google" onChange={this.handleChange} checked={state.authentication && state.authentication.has('google')} disabled={state.database === 'none'} /> Google
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/twitter-logo.svg" />
          <input type="checkbox" name="authenticationCheckboxes" value="twitter" onChange={this.handleChange} checked={state.authentication && state.authentication.has('twitter')} disabled={state.database === 'none'} /> Twitter
        </label>

        <ul className="nav nav-stacked">
          <li>
            <a data-toggle="collapse" href="#authenticationCollapse1">
              <i className="ion-help-circled" /> Is "Forgot Password" included?
            </a>
            <div id="authenticationCollapse1" className="collapse">
              <div className="panel-collapse">
                Test.
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
    let authentication = state.database ? (
      <section className="fadeIn animated">
        <h6><InlineSvg name="authentication" width="16px" height="18px"/> Authentication</h6>
        {authenticationCheckboxes}
      </section>
    ) : null;

    let reactOptions = state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h5 className="subcategory">React Features</h5>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/alt-logo.png" />
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxAlt" onChange={this.handleChange} checked={state.reactOptions && state.reactOptions.has('fluxAlt')} /> Flux (Alt)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/flux-logo.svg" />
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxRedux" onChange={this.handleChange} checked={state.reactOptions && state.reactOptions.has('fluxRedux')} /> Flux (Redux)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/react-router-logo.png" />
          <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={this.handleChange} checked={state.reactOptions && state.reactOptions.has('reactRouter')} /> React Router
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/relay-logo.svg" />
          <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={this.handleChange} checked={state.reactOptions && state.reactOptions.has('graphql')} /> GraphQL + Relay
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/babel-logo.png" />
          <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={this.handleChange} checked={state.reactOptions && state.reactOptions.has('es6')} /> ES6
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let reactBuildSystem = state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h5 className="subcategory">React Build System</h5>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/browserify-logo.svg" />
          <input type="radio" name="reactBuildSystemRadios" value="browserify" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'browserify'} /> Browserify / Gulp
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/webpack-logo.svg" />
          <input type="radio" name="reactBuildSystemRadios" value="webpack" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'webpack'} /> Webpack
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="reactBuildSystemRadios" value="none" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'none'} /> None
        </label>
      </div>
    ) : null;

    let jsFramework = (state.authentication || state.database === 'none') ? (
      <section className={cx('fadeIn', 'animated', state.jsFramework)}>
        <h6><InlineSvg name="js-framework" width="16px" height="18px"/> {!state.jsFramework || state.jsFramework === 'none' ? 'JavaScript Framework' : state.jsFramework}</h6>

        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="jsFrameworkRadios" value="none" onChange={this.handleChange} defaultChecked={state.jsFramework === 'none'} /> None
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/react-logo.svg" />
          <input type="radio" name="jsFrameworkRadios" value="react" onChange={this.handleChange} defaultChecked={state.jsFramework === 'react'} /> React
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/angularjs-logo.png" />
          <input type="radio" name="jsFrameworkRadios" value="angular" onChange={this.handleChange} defaultChecked={state.jsFramework === 'angular'} /> AngularJS
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
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
        {reactBuildSystem}
      </section>
    ) : null;


    let theme = state.jsFramework ? (
      <section className="fadeIn animated">
        <h6><InlineSvg name="theme" width="16px" height="18px"/> UI Theme</h6>
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <a className={cx("thumbnail", { 'active': this.state.theme === 'theme1' })} onClick={this.handleThemeClick.bind(this, 'theme1')}>
              <img src="http://foundry.mediumra.re/img/chooser/fashion.png" />
            </a>
          </div>
          <div className="col-xs-6 col-md-3">
            <a className={cx("thumbnail", { 'active': this.state.theme === 'theme2' })} onClick={this.handleThemeClick.bind(this, 'theme2')}>
              <img src="http://foundry.mediumra.re/img/chooser/classic.png" />
            </a>
          </div>
          <div className="col-xs-6 col-md-3">
            <a className={cx("thumbnail", { 'active': this.state.theme === 'theme3' })} onClick={this.handleThemeClick.bind(this, 'theme3')}>
              <img src="http://foundry.mediumra.re/img/chooser/winery.png" />
            </a>
          </div>
        </div>
      </section>
    ) : null;

    let deployment = state.theme ? (
      <section className={cx('fadeIn', 'animated', state.deployment)}>
        <h6><InlineSvg name="deployment" width="16px" height="18px"/> {!state.deployment || state.deployment === 'none' ? 'Deployment' : state.deployment}</h6>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/heroku-logo.svg" height="60" alt="Heroku Logo"/>
          <input type="radio" name="deploymentRadios" value="heroku" onChange={this.handleChange} defaultChecked={state.deployment === 'heroku'} /> Heroku
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/azure-logo.svg" height="60" alt="Azure Logo"/>
          <input type="radio" name="deploymentRadios" value="azure" onChange={this.handleChange} defaultChecked={state.deployment === 'azure'} /> Microsoft Azure
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/bluemix-logo.svg" alt="IBM Bluemix Logo"/>
          <input type="radio" name="deploymentRadios" value="bluemix" onChange={this.handleChange} defaultChecked={state.deployment === 'bluemix'} /> IBM Bluemix
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" />
          <input type="radio" name="deploymentRadios" value="none" onChange={this.handleChange} defaultChecked={state.deployment === 'none'} /> None
        </label>

        <ul className="nav nav-stacked">
          <li>
            <a data-toggle="collapse" href="#deploymentCollapse1">
              <i className="ion-help-circled"/> Pricing Comparison
            </a>
            <div id="deploymentCollapse1" className="collapse">
              <div className="panel-collapse">
                Select <strong>None</strong> if you are building an API server or a single-page application.
              </div>
            </div>
          </li>
        </ul>
      </section>
    ) : null;

    let base64State = base64url.encode(JSON.stringify(state));

    let summary = state.deployment ? (
      <section>
        <h6><InlineSvg name="summary" width="16px" height="18px"/> Summary</h6>
        <div className="stack-outline container">
          <div className="row">
            <div className="col-sm-4 stack">{state.platform}</div>
            <div className="col-sm-4 stack">{state.framework}</div>
            <div className="col-sm-4 stack">{state.database}</div>
          </div>

          <div className="row">
            <div className="col-sm-3 stack">{state.authentication}</div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-sm-offset-4 stack">{state.templateEngine}</div>
          </div>

          <div className="row">
            <div className="col-sm-6 stack">{state.cssFramework}</div>
            <div className="col-sm-6 stack">{state.cssPreprocessor}</div>
          </div>
          <div className="row">
          </div>

          <div className="row">
          </div>

          <div className="row">
            <div className="col-sm-3 stack">{state.jsFramework}</div>
          </div>

          <div className="row">
            <div className="col-sm-4 col-sm-offset-8 stack">{state.deployment}</div>
          </div>
        </div>
        <ul>
          <li>Platform <span className="label label-success">{state.platform}</span></li>
          <li>Framework <span className="label label-success">{state.framework}</span></li>
          <li>Template Engine <span className="label label-success">{state.templateEngine}</span></li>
          <li>Framework <span className="label label-success">{state.cssFramework === 'none' ? state.cssFramework : state.cssFramework + ' (' + state.cssFrameworkOptions + ')'}</span></li>
          <li>CSS Preprocessor <span className="label label-success">{state.cssPreprocessor || state.cssFrameworkOptions}</span></li>
          <li>Database <span className="label label-success">{state.database}</span></li>
          <li>Authentication <span className="label label-success">{Array.from(state.authentication).join(', ')}</span></li>
          <li>JS Framework <span className="label label-success">{state.jsFramework}</span></li>
          <li>Theme <span className="label label-success">{state.theme}</span></li>
          <li>Deployment <span className="label label-success">{state.deployment}</span></li>
        </ul>


      </section>
    ) : null;

    let download = state.deployment ? (
      <div>
        <h6><InlineSvg name="link" width="16px" height="18px"/> Reference Url</h6>
        <input className="form-control" type="text" value={`${location.origin}?state=${base64State}`} disabled />
        <br/>
        <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>
      </div>
    ) : null;

    return (
      <div className="container">
        <br/>
        {platform}
        {framework}
        {templateEngine}
        {cssFramework}
        {cssPreprocessor}
        {database}
        {authentication}
        {jsFramework}
        {theme}
        {deployment}
        {download}
        <br/>
        <a className="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a>&nbsp;
        <a className="twitter-follow-button" href="https://twitter.com/EvNowAndForever" data-show-count="false">
          Follow @EvNowAndForever</a>
      </div>
    );
  }
}

export default Home;
