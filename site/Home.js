/* global $ */

const haikunate = require('haikunator');
import React from 'react';
import { clone } from 'lodash';

import Header from './Header';
import Footer from './Footer';
import Platform from './sections/Platform';
import Framework from './sections/Framework';
import TemplateEngine from './sections/TemplateEngine';
import CssFramework from './sections/CssFramework';
import CssPreprocessor from './sections/CssPreprocessor';
import BuildTool from './sections/BuildTool';
import Testing from './sections/Testing'
import Database from './sections/Database';
import Authentication from './sections/Authentication';
import JsFramework from './sections/JsFramework';
import Deployment from './sections/Deployment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  clickDownload() {
    const state = this.state;
    const downloadBtn = this.refs.downloadBtn;

    // Google Analytics event
    // ga("send","event","Customize","Download","Customize and Download")

    const data = clone(state);
    data.appName = haikunate({ tokenLength: 0 });

    if (data.authentication) {
      data.authentication = Array.from(data.authentication);
    }

    $.ajax({
      url: '/download',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    }).done((response, status, request) => {
      $(downloadBtn).removeAttr('disabled');

      const disp = request.getResponseHeader('Content-Disposition');
      if (disp && disp.search('attachment') !== -1) {
        const form = $('<form method="POST" action="/download">');
        $.each(data, (k, v) => {
          form.append($(`<input type="hidden" name="${k}" value="${v}">`));
        });
        $('body').append(form);
        form.submit();
      }
    }).fail((jqXHR) => {
      window.notie.alert(3, jqXHR.responseText, 2.5);
    });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    const isChecked = e.target.checked;
    const state = clone(this.state);
    const refs = this.refs;

    switch (name) {
      case 'beginner':
        state.beginner = isChecked;
        break;

      case 'platformRadios':
        // Reset everything
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            if (key !== 'beginner') {
              state[key] = null;
            }
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
        if (state.cssPreprocessor) {
          state.cssPreprocessor = 'css';
        }
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

      case 'testingRadios':
        state.testing = value;
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

      default:
        // Handle default case
    }

    this.setState(state);
  }

  render() {
    const state = this.state;

    const platform = <Platform platform={state.platform} handleChange={this.handleChange} />;

    const framework = state.platform ? (
      <Framework {...state} handleChange={this.handleChange} />
    ) : null;

    const templateEngine = state.framework ? (
      <TemplateEngine {...state} handleChange={this.handleChange} />
    ) : null;

    const cssFramework = state.templateEngine ? (
      <CssFramework {...state} handleChange={this.handleChange} />
    ) : null;

    const cssPreprocessor = state.cssFramework ? (
      <CssPreprocessor {...state} handleChange={this.handleChange} />
    ) : null;

    const jsFramework = state.cssPreprocessor ? (
      <JsFramework {...state} handleChange={this.handleChange} />
    ) : null;

    const buildTool = state.jsFramework ? (
      <BuildTool {...state} handleChange={this.handleChange} />
    ) : null;

    const testing = state.buildTool ? (
      <Testing {...state} handleChange={this.handleChange} />
    ) : null;

    const database = state.testing ? (
      <Database {...state} handleChange={this.handleChange} />
    ) : null;

    const authentication = state.database ? (
      <Authentication {...state} handleChange={this.handleChange} />
    ) : null;

    const deployment = (state.authentication || state.database === 'none') ? (
      <Deployment {...state} handleChange={this.handleChange} />
    ) : null;

    const download = state.deployment ? (
      <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>
    ) : null;

    const beginner = (
      <div className="checkbox">
        <label>
          <input type="checkbox" name="beginner" value={state.beginner} onChange={this.handleChange} />
          <span>I am Beginner <abbr title="Provides personal recommendations for beginners. Use this only when you are not sure what to pick.">What's this?</abbr></span>
        </label>
      </div>
    );

    //const category = (
    //  <div className="row">
    //    <div className="col-sm-4">
    //      <div className="panel category-panel active">
    //        <div className="panel-body">
    //          <img src="/img/svg/node-logo.svg" height="27"/>
    //
    //          <div>Web Application</div>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="col-sm-4">
    //      <div className="panel category-panel">
    //        <div className="panel-body">
    //          <img src="/img/svg/polymer-logo.svg" height="27"/>
    //          <div>JavaScript Library</div>
    //        </div>
    //      </div>
    //    </div>
    //    <div className="col-sm-4">
    //      <div className="panel category-panel">
    //        <div className="panel-body">
    //          <img src="/img/svg/html5-logo.svg" height="27"/>
    //          <div>Static Site</div>
    //        </div>
    //      </div>
    //    </div>
    //  </div>
    //);

    return (
      <main>
        <Header />
        <div className="container">
          <br/>
          {beginner}
          <div ref="platform">{platform}</div>
          <div ref="framework">{framework}</div>
          <div ref="templateEngine">{templateEngine}</div>
          <div ref="cssFramework">{cssFramework}</div>
          <div ref="cssPreprocessor">{cssPreprocessor}</div>
          <div ref="jsFramework">{jsFramework}</div>
          <div ref="buildTool">{buildTool}</div>
          <div ref="testing">{testing}</div>
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
