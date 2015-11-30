/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');


import React from 'react';
import ReactDOM from 'react-dom';
import {isArray, clone} from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.generateAppName = this.generateAppName.bind(this);
    this.handleAppNameChange = this.handleAppNameChange.bind(this);

    let query = url.parse(location.href, true).query;

    this.state = {
      platform: query.platform || null,
      framework: query.framework || null,
      appName: query.appName || null,
      templateEngine: query.templateEngine || null,
      cssFramework: query.cssFramework || null,
      cssPreprocessor: query.cssPreprocessor || null,
      cssBuildOptions: query.cssBuildOptions || null,
      database: query.database || null,
      authentication: isArray(query.authentication) ? new Set(query.authentication) : new Set(Array(query.authentication)),
      jsFramework: query.jsFramework || null,
      reactOptions: query.reactOptions || null,
      reactBuildSystem: query.reactBuildSystem || null
    };
  }

  componentDidUpdate() {
    $(ReactDOM.findDOMNode(this)).find('[data-toggle="popover"]').popover({ trigger: 'hover' });
  }

  clickDownload() {
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

    let data = clone(this.state);
    data.appName = this.state.appName || haikunate({ tokenLength: 0 });

    $.ajax({
        url: '/download',
        method: 'POST',
        data: data
      })
      .success((response, status, request) => {
        $(downloadBtn).removeAttr('disabled');

        console.log(this.state);
        var disp = request.getResponseHeader('Content-Disposition');
        if (disp && disp.search('attachment') != -1) {
          var form = $('<form method="POST" action="/download">');
          $.each(this.state, function(k, v) {
            form.append($('<input type="hidden" name="' + k +
              '" value="' + v + '">'));
          });
          $('body').append(form);
          form.submit();
        }
      });
  }

  generateAppName() {
    let state = this.state;
    state.appName = haikunate({ tokenLength: 0 });
    this.setState(state);
    this.refs.appNameInput.focus();
  }

  handleAppNameChange(e) {
    let state = this.state;
    state.appName = e.target.value;
    this.setState(state);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    let isChecked = e.target.checked;
    let state = this.state;
    switch (name) {
      case 'platformRadios':
        state.platform = value;
        break;
      case 'frameworkRadios':
        state.framework = value;
        break;
      case 'templateEngineRadios':
        state.templateEngine = value;
        break;
      case 'cssFrameworkRadios':
        if (value === 'none' || value.includes('Css')) {
          delete state.cssPreprocessor;
          delete state.cssBuildOptions;
        }
        state.cssFramework = value;
        break;
      case 'cssPreprocessorRadios':
        if (value === 'none' || value.includes('Css')) {
          delete state.cssBuildOptions;
        }
        state.cssPreprocessor = value;
        break;
      case 'cssBuildOptionsRadios':
        state.cssBuildOptions = value;
        break;
      case 'databaseRadios':
        state.database = value;
        break;
      case 'authenticationCheckboxes':
        state.authentication = state.authentication || new Set();
        if (isChecked) {
          if (value === 'none') {
            state.authentication.clear();
          }
          state.authentication.add(value);
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
    }

    this.setState(state);
  }

  render() {
    console.log('state', this.state);
    let platform = (
      <div>
        <h3>Platform</h3>
        <label className="radio-inline">
          <input type="radio" name="platformRadios" value="node" onChange={this.handleChange} defaultChecked={this.state.platform === 'node'} /> Node.js
        </label>
      </div>
    );

    let framework = this.state.platform ? (
      <div className="fadeIn animated">
        <h3>Framework</h3>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="express" onChange={this.handleChange} defaultChecked={this.state.framework === 'express'} /> Express
        </label>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="hapi" onChange={this.handleChange} defaultChecked={this.state.framework === 'hapi'} /> Hapi
        </label>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="sails" onChange={this.handleChange} defaultChecked={this.state.framework === 'sails'} /> Sails.js
        </label>

        <br/>
        <br/>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="appNameInput">App Name (optional)</label>
            <div className="input-group">
              <input type="text" ref="appNameInput" className="form-control" onChange={this.handleAppNameChange} value={this.state.appName} placeholder="App Name" autoFocus />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.generateAppName}>Generate</button>
          </span>
            </div>
            <div className="help-block">Leave blank and we'll choose one for you.</div>
          </div>
        </div>

      </div>
    ) : null;

    let templateEngine = this.state.framework ? (
      <div className="fadeIn animated">
        <h3>Template Engine</h3>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="none" onChange={this.handleChange} defaultChecked={this.state.templateEngine === 'none'} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="jade" onChange={this.handleChange} defaultChecked={this.state.templateEngine === 'jade'} /> Jade
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="handlebars" onChange={this.handleChange} defaultChecked={this.state.templateEngine === 'handlebars'} /> Handlebars
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="swig" onChange={this.handleChange} defaultChecked={this.state.templateEngine === 'swig'} /> Swig
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
      </div>
    ) : null;

    let cssFrameworkNoTemplateEngineAlert = ((this.state.cssFramework && this.state.cssFramework !== 'none') && this.state.templateEngine === 'none') ? (
      <div className="alert alert-info fadeIn animated">
        <strong>Important!</strong> You have NOT selected a template engine. CSS Framework files are still going to be generated, but you will be responsible for importing these files manually.
      </div>
    ) : null;

    let cssFramework = this.state.templateEngine ? (
      <div className="fadeIn animated">
        <h3>CSS Framework</h3>
        {cssFrameworkNoTemplateEngineAlert}
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="none" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'none'} /> None
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapCss" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'bootstrapCss'} /> Bootstrap (CSS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapLess" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'bootstrapLess'} /> Bootstrap (LESS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapSass" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'bootstrapSass'} /> Bootstrap (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="foundationCss" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'foundationCss'} /> Foundation (CSS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="foundationSass" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'foundationSass'} /> Foundation (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bourbonNeat" onChange={this.handleChange} defaultChecked={this.state.cssFramework === 'bourbonNeat'} /> Bourbon + Neat (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
      </div>
    ) : null;

    let cssPreprocessor = this.state.cssFramework === 'none' ? (
      <div className="fadeIn animated">
        <h3>CSS Preprocessor</h3>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="css" onChange={this.handleChange} defaultChecked={this.state.cssPreprocessor === 'css'} /> CSS
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="sass" onChange={this.handleChange} defaultChecked={this.state.cssPreprocessor === 'sass'} /> Sass
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="less" onChange={this.handleChange} defaultChecked={this.state.cssPreprocessor === 'less'} /> LESS
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="postcss" onChange={this.handleChange} defaultChecked={this.state.cssPreprocessor === 'postcss'} /> PostCSS
        </label>
      </div>
    ) : null;

    let cssBuildOptions = (this.state.cssPreprocessor === 'sass' ||
    this.state.cssPreprocessor === 'less' ||
    this.state.cssPreprocessor === 'postcss' ||
    this.state.cssFramework === 'bootstrapLess' ||
    this.state.cssFramework === 'bootstrapSass' ||
    this.state.cssFramework === 'foundationSass' ||
    this.state.cssFramework === 'bourbonNeat') ? (
      <div className="fadeIn animated">
        <h3>CSS Build Options</h3>
        <label className="radio-inline">
          <input type="radio" name="cssBuildOptionsRadios" value="middleware" onChange={this.handleChange} defaultChecked={this.state.cssBuildOptions === 'middleware'} /> Middleware
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssBuildOptionsRadios" value="gulp" onChange={this.handleChange} defaultChecked={this.state.cssBuildOptions === 'gulp'} /> Gulp
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssBuildOptionsRadios" value="webpack" onChange={this.handleChange} defaultChecked={this.state.cssBuildOptions === 'webpack'} /> Webpack
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssBuildOptionsRadios" value="grunt" onChange={this.handleChange} defaultChecked={this.state.cssBuildOptions === 'grunt'} /> Grunt
        </label>
      </div>
    ) : null;

    let database = this.state.templateEngine ? (
      <div className="fadeIn animated">
        <h3>Database</h3>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="none" onChange={this.handleChange} defaultChecked={this.state.database === 'none'} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="mongodb" onChange={this.handleChange} defaultChecked={this.state.database === 'mongodb'} /> MongoDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="mysql" onChange={this.handleChange} defaultChecked={this.state.database === 'mysql'} /> MySQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="postgresql" onChange={this.handleChange} defaultChecked={this.state.database === 'postgresql'} /> PostgreSQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="rethinkdb" onChange={this.handleChange} defaultChecked={this.state.database === 'rethinkdb'} /> RethinkDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let authentication = this.state.database ? (
      <div className="fadeIn animated">
        <h3>Authentication</h3>
        <label className="checkbox-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="none" onChange={this.handleChange} checked={this.state.authentication.has('none')} /> None
        </label>
        <label className="checkbox-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="email" onChange={this.handleChange} checked={this.state.authentication.has('email')} disabled={this.state.authentication.has('none')} /> Email / Password
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="facebook" onChange={this.handleChange} checked={this.state.authentication.has('facebook')} disabled={this.state.authentication.has('none')} /> Facebook
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="google" onChange={this.handleChange} checked={this.state.authentication.has('google')} disabled={this.state.authentication.has('none')} /> Google
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="twitter" onChange={this.handleChange} checked={this.state.authentication.has('twitter')} disabled={this.state.authentication.has('none')} /> Twitter
        </label>
      </div>
    ) : null;

    let jsFramework = this.state.authentication ? (
      <div className="fadeIn animated">
        <h3>JavaScript Framework <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Technically both jQuery and React are considered libraries, not frameworks." /></h3>

        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="none" onChange={this.handleChange} defaultChecked={this.state.jsFramework === 'none'} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="jquery" onChange={this.handleChange} defaultChecked={this.state.jsFramework === 'jquery'} /> jQuery
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="react" onChange={this.handleChange} defaultChecked={this.state.jsFramework === 'react'} /> React
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="angular" onChange={this.handleChange} defaultChecked={this.state.jsFramework === 'angular'} /> AngularJS
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let reactOptions = this.state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h3>React Features</h3>
        <label className="checkbox-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxAlt" onChange={this.handleChange} defaultChecked={this.state.reactOptions === 'fluxAlt'} /> Flux (Alt)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="checkbox-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxRedux" onChange={this.handleChange} defaultChecked={this.state.reactOptions === 'fluxRedux'} /> Flux (Redux)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={this.handleChange} defaultChecked={this.state.reactOptions === 'reactRouter'} /> React Router
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={this.handleChange} defaultChecked={this.state.reactOptions === 'graphql'} /> GraphQL + Relay
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={this.handleChange} defaultChecked={this.state.reactOptions === 'es6'} /> ES6
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let reactBuildSystem = this.state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h3>React Build System</h3>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="browserify" onChange={this.handleChange} defaultChecked={this.state.reactBuildSystem === 'browserify'} /> Browserify / Gulp
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="webpack" onChange={this.handleChange} defaultChecked={this.state.reactBuildSystem === 'webpack'} /> Webpack
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="none" onChange={this.handleChange} defaultChecked={this.state.reactBuildSystem === 'none'} /> None
        </label>
      </div>
    ) : null;

    let theme = this.state.jsFramework ? (
      <div className="fadeIn animated">
        <h3>Theme</h3>
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <a href="#" className="thumbnail">
              <img src="http://foundry.mediumra.re/img/chooser/fashion.png" />
            </a>
          </div>
          <div className="col-xs-6 col-md-3">
            <a href="#" className="thumbnail">
              <img src="http://foundry.mediumra.re/img/chooser/classic.png" />
            </a>
          </div>
          <div className="col-xs-6 col-md-3">
            <a href="#" className="thumbnail">
              <img src="http://foundry.mediumra.re/img/chooser/winery.png" />
            </a>
          </div>
        </div>
      </div>
    ) : null;

    let download = (
      <div>
        <br/>
        <button ref="downloadBtn" className="btn btn-lg btn-primary btn-outline" onClick={this.clickDownload}>Compile and Download</button>
      </div>
    );

    return (
      <div className="container">
        <h2>Let's get started.</h2>

        {platform}
        {framework}
        {templateEngine}
        {cssFramework}
        {cssPreprocessor}
        {cssBuildOptions}
        {database}
        {authentication}
        {jsFramework}
        {reactOptions}
        {reactBuildSystem}
        {theme}
        {download}
      </div>
    );
  }
}

export default Home;
