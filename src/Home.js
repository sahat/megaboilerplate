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
import Authentication from './sections/Authentication';
import JsFramework from './sections/JsFramework';
import Theme from './sections/Theme';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.handleThemeClick = this.handleThemeClick.bind(this);
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

  handleThemeClick(event) {
    let theme = event.target.getAttribute('data-theme');
    this.setState({ theme: theme });
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

    let authentication = state.database ? (
      <Authentication database={state.database} authentication={state.authentication} handleChange={this.handleChange} />
    ) : null;

    let jsFramework = (state.authentication || state.database === 'none') ? (
      <JsFramework jsFramework={state.jsFramework} handleChange={this.handleChange} />
    ) : null;


    let theme = state.jsFramework ? (
      <Theme theme={state.theme} handleThemeClick={this.handleThemeClick} />
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
