/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');
let base64url = require('base64-url');
import React from 'react';
import ReactDOM from 'react-dom';
import {isArray, forOwn, clone} from 'lodash';
import { createHistory, useQueries } from 'history';

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
    this.handleThemeClick = this.handleThemeClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
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

      case 'buildToolRadios':
        state.buildTool = value;
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

    let jsFramework = state.cssPreprocessor ? (
      <JsFramework jsFramework={state.jsFramework} reactOptions={state.reactOptions} handleChange={this.handleChange} />
    ) : null;

    let buildTool = state.jsFramework ? (
      <BuildTool buildTool={state.buildTool} jsFramework={state.jsFramework} cssPreprocessor={state.cssPreprocessor} handleChange={this.handleChange} />
    ) : null;

    let database = state.cssPreprocessor ? (
      <Database database={state.database} handleChange={this.handleChange} />
    ) : null;

    let authentication = state.database ? (
      <Authentication database={state.database} authentication={state.authentication} handleChange={this.handleChange} />
    ) : null;

    let theme = (state.authentication || state.database === 'none') ? (
      <Theme theme={state.theme} handleThemeClick={this.handleThemeClick} />
    ) : null;

    let deployment = state.theme ? (
      <Deployment deployment={state.deployment} handleChange={this.handleChange} />
    ) : null;

    let base64State = base64url.encode(JSON.stringify(state));

    let download = state.deployment ? (
      <div>
        <h6>Reference Url</h6>
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
        {jsFramework}
        {buildTool}
        {database}
        {authentication}
        {theme}
        {deployment}
        {download}
      </div>
    );
  }
  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }
}

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';


class NodeViewer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    let json = JSON.stringify(this.props.node, null, 4);
    if(!json){ json = HELP_MSG; }
    return (
      <div>
        {json}
      </div>
    );
  }
}

export default Home;
