/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');
let cx = require('classnames');
let base64url = require('base64-url');
import React from 'react';
import ReactDOM from 'react-dom';
import {isArray, forOwn, clone} from 'lodash';
import { createHistory, useQueries } from 'history';
import { Treebeard, decorators, theme } from 'react-treebeard';

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
import Deployment from './sections/Deployment';


let styles = {
  component: {
    width: '50%',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '20px',
    '@media (max-width: 640px)': {
      width: '100%',
      display: 'block'
    }
  },
  viewer: {
    base: {
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#282C34',
      border: 'solid 1px black',
      padding: '20px',
      color: '#9DA5AB',
      minHeight: '250px'
    }
  }
};

decorators.Header = (props) => {
  const style = props.style;
  const iconType = props.node.children ? 'folder' : 'file-text';
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = { marginRight: '5px' };
  return (
    <div style={style.base}>
      <div style={style.title}>
        <i className={iconClass} style={iconStyle}/>
        {props.node.name}
      </div>
    </div>
  );
};


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.handleThemeClick = this.handleThemeClick.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  getTreeData() {
    return {
      name: 'app',
      toggled: true,
      children: [
        {
          name: 'example',
          children: [
            { name: 'app.js' },
            { name: 'data.js' },
            { name: 'index.html' },
            { name: 'styles.js' },
            { name: 'webpack.config.js' }
          ]
        },
        {
          name: 'node_modules',
          loading: true,
          children: []
        },
        {
          name: 'src',
          children: [
            {
              name: 'components',
              children: [
                { name: 'decorators.js' },
                { name: 'treebeard.js' }
              ]
            },
            { name: 'index.js' }
          ]
        },
        {
          name: 'themes',
          children: [
            { name: 'animations.js' },
            { name: 'default.js' }
          ]
        },
        { name: 'Gulpfile.js' },
        { name: 'index.js' },
        { name: 'package.json' }
      ]
    };
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
      <JsFramework jsFramework={state.jsFramework} reactOptions={state.reactOptions} reactBuildSystem={state.reactBuildSystem} cssBuildOptions={state.cssBuildOptions} handleChange={this.handleChange} />
    ) : null;

    let theme = state.jsFramework ? (
      <Theme theme={state.theme} handleThemeClick={this.handleThemeClick} />
    ) : null;

    let deployment = state.theme ? (
      <Deployment deployment={state.deployment} handleChange={this.handleChange} />
    ) : null;

    let base64State = base64url.encode(JSON.stringify(state));

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
        <div style={styles.component}>
          <Treebeard
            data={this.getTreeData()}
            onToggle={this.onToggle}
            decorators={decorators}
          />
        </div>
        <div style={styles.component}>
          <NodeViewer node={this.state.cursor}/>
        </div>
        <div>
          <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>
        </div>
        <br/>
        <a className="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a>&nbsp;
        <a className="twitter-follow-button" href="https://twitter.com/EvNowAndForever" data-show-count="false">
          Follow @EvNowAndForever</a>
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
    const style = styles.viewer;
    let json = JSON.stringify(this.props.node, null, 4);
    if(!json){ json = HELP_MSG; }
    return (
      <div style={style.base}>
        {json}
      </div>
    );
  }
}

export default Home;
