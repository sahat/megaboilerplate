/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');
let base64url = require('base64-url');
import React from 'react';
import ReactDOM from 'react-dom';
import {isArray, forOwn, clone} from 'lodash';
import { createHistory, useQueries } from 'history';

import Header from './Header';
import Footer from './Footer';
import Platform from './sections/Platform';
import Framework from './sections/Framework';
import TemplateEngine from './sections/TemplateEngine';
import CssFramework from './sections/CssFramework';
import CssPreprocessor from './sections/CssPreprocessor';
import BuildTool from './sections/BuildTool';
import Database from './sections/Database';
import Authentication from './sections/Authentication';
import JsFramework from './sections/JsFramework';
import Theme from './sections/Theme';
import Deployment from './sections/Deployment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  clickDownload() {
    let state = this.state;
    let downloadBtn = this.refs.downloadBtn;

    // Google Analytics event
    //ga("send","event","Customize","Download","Customize and Download")

    let data = clone(state);
    data.appName = haikunate({ tokenLength: 0 });

    if (data.authentication) {
      data.authentication = Array.from(data.authentication);
    }

    $.ajax({
        url: '/download',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      })
      .done((response, status, request) => {
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
      })
      .fail(function(jqXHR) {
        window.notie.alert(3, jqXHR.statusText, 2.5);
      });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let isChecked = e.target.checked;
    let state = clone(this.state);
    let refs = this.refs;

    switch (name) {
      case 'platformRadios':
        // Reset everything
        for (let key in state) {
          if (state.hasOwnProperty(key) ) {
            state[key] = null;
          }
        }
        state.platform = value;
        window.smoothScroll(refs.framework);
        break;

      case 'frameworkRadios':
        if (!state.framework) {
          window.smoothScroll(refs.templateEngine);
        }
        state.framework = value;
        break;

      case 'templateEngineRadios':
        if (!state.templateEngine) {
          window.smoothScroll(refs.cssFramework);
        }
        state.templateEngine = value;
        break;

      case 'cssFrameworkRadios':
        if (!state.cssFramework) {
          window.smoothScroll(refs.cssPreprocessor);
        }
        state.cssPreprocessor = null;
        state.cssFramework = value;
        break;

      case 'cssPreprocessorRadios':
        if (!state.cssPreprocessor) {
          window.smoothScroll(refs.jsFramework);
        }
        state.cssPreprocessor = value;
        break;

      case 'jsFrameworkRadios':
        if (!state.jsFramework) {
          window.smoothScroll(refs.buildTool);
        }
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

      case 'buildToolRadios':
        if (!state.buildTool) {
          window.smoothScroll(refs.database);
        }
        state.buildTool = value;
        break;

      case 'databaseRadios':
        if (!state.database) {
          window.smoothScroll(refs.authentication);
        }
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

      case 'deploymentRadios':
        if (!state.deployment) {
          window.smoothScroll(refs.download);
        }
        state.deployment = value;
        break;
    }

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

    let jsFramework = state.cssPreprocessor ? (
      <JsFramework jsFramework={state.jsFramework} reactOptions={state.reactOptions} handleChange={this.handleChange} />
    ) : null;

    let buildTool = state.jsFramework ? (
      <BuildTool buildTool={state.buildTool} jsFramework={state.jsFramework} cssPreprocessor={state.cssPreprocessor} handleChange={this.handleChange} />
    ) : null;

    let database = state.buildTool ? (
      <Database database={state.database} handleChange={this.handleChange} />
    ) : null;

    let authentication = state.database ? (
      <Authentication database={state.database} authentication={state.authentication} handleChange={this.handleChange} />
    ) : null;

    let deployment = (state.authentication || state.database === 'none')? (
      <Deployment deployment={state.deployment} handleChange={this.handleChange} />
    ) : null;

    let download = state.deployment ? (
      <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>
    ) : null;

    return (
      <main>
        <Header />
        <div className="container">
          <br/>
          <div ref="platform">{platform}</div>
          <div ref="framework">{framework}</div>
          <div ref="templateEngine">{templateEngine}</div>
          <div ref="cssFramework">{cssFramework}</div>
          <div ref="cssPreprocessor">{cssPreprocessor}</div>
          <div ref="jsFramework">{jsFramework}</div>
          <div ref="buildTool">{buildTool}</div>
          <div ref="database">{database}</div>
          <div ref="authentication">{authentication}</div>
          <div ref="deployment">{deployment}</div>
          <div ref="download">{download}</div>
          <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>

        </div>
        <Footer />
      </main>

    );
  }
}

export default Home;
