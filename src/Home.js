/* global JSZip saveAs */

let haikunate = require('haikunator');
let url = require('url');
let cx = require('classnames');

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
      jsFramework: query.jsFramework || null,
      reactOptions: query.reactOptions || null,
      reactBuildSystem: query.reactBuildSystem || null
    };

    if (query.authentication) {
      this.state.authentication = isArray(query.authentication) ? new Set(query.authentication) : new Set(Array(query.authentication));
    } else {
      this.state.authentication = new Set();
    }

    if (query.reactOptions) {
      this.state.reactOptions = isArray(query.reactOptions) ? new Set(query.reactOptions) : new Set(Array(query.reactOptions));
    } else {
      this.state.reactOptions = new Set();
    }

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
        if (value === 'none') {
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

    let platform = (
      <section>
        <h6>Platform</h6>
        <hr/>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/node-logo.svg" alt="Node.js Logo"/>
          <input type="radio" id="nodeRadio" name="platformRadios" value="node" onChange={this.handleChange} defaultChecked={state.platform === 'node'} /> Node.js
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/ruby-logo.svg" alt="Ruby Logo"/>
          <input type="radio" id="rubyRadio" name="platformRadios" value="ruby" onChange={this.handleChange} defaultChecked={state.platform === 'ruby'} /> Ruby
        </label>
      </section>
    );

    let framework = state.platform ? (
      <section className="fadeIn animated">
        <h6>Framework</h6>
        <hr/>
        <label className="radio-inline">
          <span className="express-logo">Express</span>
          <input type="radio" id="expressRadio" name="frameworkRadios" value="express" onChange={this.handleChange} defaultChecked={state.framework === 'express'} />
          <label htmlFor="expressRadio">Express</label>
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/hapi-logo.png" alt="Hapi Logo"/>
          <input type="radio" name="frameworkRadios" value="hapi" onChange={this.handleChange} defaultChecked={state.framework === 'hapi'} /> Hapi
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/sails-logo.png" alt="Sails.js Logo"/>
          <input type="radio" name="frameworkRadios" value="sails" onChange={this.handleChange} defaultChecked={state.framework === 'sails'} /> Sails.js
        </label>

        <br/>
        <br/>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="appNameInput">App Name (optional)</label>
            <div className="input-group">
              <input type="text" ref="appNameInput" className="form-control" onChange={this.handleAppNameChange} value={state.appName} placeholder="App Name" autoFocus />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button" onClick={this.generateAppName}>Generate</button>
          </span>
            </div>
            <div className="help-block">Leave blank and we'll choose one for you.</div>
          </div>
        </div>

      </section>
    ) : null;

    let templateEngine = state.framework ? (
      <section className="fadeIn animated">
        <h6>Template Engine</h6>
        <hr/>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" />
          <input type="radio" name="templateEngineRadios" value="none" onChange={this.handleChange} defaultChecked={state.templateEngine === 'none'} /> None
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/jade-logo.svg" alt="Jade Logo"/>
          <input type="radio" name="templateEngineRadios" value="jade" onChange={this.handleChange} defaultChecked={state.templateEngine === 'jade'} /> Jade
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/handlebars-logo.svg" alt="Handlebars Logo"/>

          <input type="radio" name="templateEngineRadios" value="handlebars" onChange={this.handleChange} defaultChecked={state.templateEngine === 'handlebars'} /> Handlebars
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
      </section>
    ) : null;
1
    let cssFrameworkNoTemplateEngineAlert = ((state.cssFramework && state.cssFramework !== 'none') && state.templateEngine === 'none') ? (
      <div className="alert alert-info fadeIn animated">
        <strong>Important!</strong> You have NOT selected a template engine. CSS Framework files are still going to be generated, but you will be responsible for importing these files manually.
      </div>
    ) : null;

    let cssFrameworkOptions = (
      <div>
        <h5 className="subcategory">Framework Options</h5>
        <label className="radio-inline">
          <img className="btn-logo small" src="/img/svg/css3-logo.svg" alt="CSS Logo"/>
          <input type="radio" name="cssFrameworkOptionsRadios" value="css" onChange={this.handleChange} defaultChecked={state.cssFramework === 'bootstrapLess'} /> CSS
        </label>
        <label className="radio-inline">
          <img className="btn-logo small" src="/img/svg/less-logo.svg" alt="LESS Logo"/>
          <input type="radio" name="cssFrameworkOptionsRadios" value="less" onChange={this.handleChange} defaultChecked={state.cssFramework === 'bootstrapLess'} /> LESS
        </label>
        <label className="radio-inline">
          <img className="btn-logo small" src="/img/svg/sass-logo.svg" alt="Sass Logo"/>
          <input type="radio" name="cssFrameworkOptionsRadios" value="sass" onChange={this.handleChange} defaultChecked={state.cssFramework === 'bootstrapSass'} /> Sass
        </label>
      </div>
    );

    let cssFramework = state.templateEngine ? (
      <section className="fadeIn animated">
        <h6>CSS Framework</h6>
        <hr/>
        {cssFrameworkNoTemplateEngineAlert}
        <label className="radio-inline">
            <img className="btn-logo" src="/img/svg/none.png" />
            <input type="radio" name="cssFrameworkRadios" value="none" onChange={this.handleChange} defaultChecked={state.cssFramework === 'none'} /> None
        </label>
        <label className="radio-inline">
            <img className="btn-logo" src="/img/svg/bootstrap-logo.svg" alt="Bootstrap Logo"/>
            <input type="radio" name="cssFrameworkRadios" value="bootstrap" onChange={this.handleChange} defaultChecked={state.cssFramework === 'bootstrap'} /> Bootstrap
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
            <img className="btn-logo" src="/img/svg/foundation-logo.svg" alt="Foundation Logo"/>

            <input type="radio" name="cssFrameworkRadios" value="foundation" onChange={this.handleChange} defaultChecked={state.cssFramework === 'foundation'} /> Foundation
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
            <img className="btn-logo" src="/img/svg/bourbon-logo.svg" alt="Bourbon Neat Logo"/>
            <input type="radio" name="cssFrameworkRadios" value="bourbonNeat" onChange={this.handleChange} defaultChecked={state.cssFramework === 'bourbonNeat'} /> Bourbon Neat
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>

        {cssFrameworkOptions}
      </section>
    ) : null;

    let cssPreprocessor = state.cssFramework === 'none' ? (
      <section className="fadeIn animated">
        <h3>CSS Preprocessor</h3>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/css3-logo.svg" alt="CSS Logo"/>

          <input type="radio" name="cssPreprocessorRadios" value="css" onChange={this.handleChange} defaultChecked={state.cssPreprocessor === 'css'} /> CSS
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/sass-logo.svg" alt="Sass Logo"/>

          <input type="radio" name="cssPreprocessorRadios" value="sass" onChange={this.handleChange} defaultChecked={state.cssPreprocessor === 'sass'} /> Sass
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/less-logo.svg" alt="LESS Logo"/>

          <input type="radio" name="cssPreprocessorRadios" value="less" onChange={this.handleChange} defaultChecked={state.cssPreprocessor === 'less'} /> LESS
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/postcss-logo.png" alt="PostCSS Logo"/>

          <input type="radio" name="cssPreprocessorRadios" value="postcss" onChange={this.handleChange} defaultChecked={state.cssPreprocessor === 'postcss'} /> PostCSS
        </label>
      </section>
    ) : null;

    let cssBuildOptions = (state.cssPreprocessor === 'sass' ||
    state.cssPreprocessor === 'less' ||
    state.cssPreprocessor === 'postcss' ||
    state.cssFramework === 'bootstrapLess' ||
    state.cssFramework === 'bootstrapSass' ||
    state.cssFramework === 'foundationSass' ||
    state.cssFramework === 'bourbonNeat') ? (
      <section className="fadeIn animated">
        <h3>CSS Build Options</h3>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/npm-logo.svg" alt="Middleware Logo"/>
          <input type="radio" name="cssBuildOptionsRadios" value="middleware" onChange={this.handleChange} defaultChecked={state.cssBuildOptions === 'middleware'} /> Middleware
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/gulp-logo.png" alt="Gulp Logo"/>
          <input type="radio" name="cssBuildOptionsRadios" value="gulp" onChange={this.handleChange} defaultChecked={state.cssBuildOptions === 'gulp'} /> Gulp
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/webpack-logo.svg" alt="Webpack Logo"/>

          <input type="radio" name="cssBuildOptionsRadios" value="webpack" onChange={this.handleChange} defaultChecked={state.cssBuildOptions === 'webpack'} /> Webpack
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/grunt-logo.svg" alt="Grunt Logo"/>
          <input type="radio" name="cssBuildOptionsRadios" value="grunt" onChange={this.handleChange} defaultChecked={state.cssBuildOptions === 'grunt'} /> Grunt
        </label>
      </section>
    ) : null;

    let database = state.cssFramework ? (
      <section className="fadeIn animated">
        <h3>Database</h3>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="databaseRadios" value="none" onChange={this.handleChange} defaultChecked={state.database === 'none'} /> None
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/mongodb-logo.svg"></img>

          <input type="radio" name="databaseRadios" value="mongodb" onChange={this.handleChange} defaultChecked={state.database === 'mongodb'} /> MongoDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/mysql-logo.svg"></img>

          <input type="radio" name="databaseRadios" value="mysql" onChange={this.handleChange} defaultChecked={state.database === 'mysql'} /> MySQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/postgresql-logo.svg"></img>

          <input type="radio" name="databaseRadios" value="postgresql" onChange={this.handleChange} defaultChecked={state.database === 'postgresql'} /> PostgreSQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/rethinkdb-logo.svg"></img>

          <input type="radio" name="databaseRadios" value="rethinkdb" onChange={this.handleChange} defaultChecked={state.database === 'rethinkdb'} /> RethinkDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </section>
    ) : null;


    let authenticationAlert = (state.database === 'none') ? (
      <div className="alert alert-info">
        <strong>Important!</strong> To enable authentication you must choose one of the databases above.
      </div>
    ) : null;

    let authentication = state.database ? (
      <section className="fadeIn animated">
        <h3>Authentication</h3>
        {authenticationAlert}
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="checkbox" name="authenticationCheckboxes" value="none" onChange={this.handleChange} checked={state.authentication.size === 0} disabled={state.database === 'none'} /> None
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/passportjs-logo.svg"></img>

          <input type="checkbox" name="authenticationCheckboxes" value="email" onChange={this.handleChange} checked={state.authentication.has('email')} disabled={state.database === 'none'} /> Email / Password
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/facebook-logo.svg"></img>

          <input type="checkbox" name="authenticationCheckboxes" value="facebook" onChange={this.handleChange} checked={state.authentication.has('facebook')} disabled={state.database === 'none'} /> Facebook
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/google-logo.svg"></img>

          <input type="checkbox" name="authenticationCheckboxes" value="google" onChange={this.handleChange} checked={state.authentication.has('google')} disabled={state.database === 'none'} /> Google
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/twitter-logo.svg"></img>

          <input type="checkbox" name="authenticationCheckboxes" value="twitter" onChange={this.handleChange} checked={state.authentication.has('twitter')} disabled={state.database === 'none'} /> Twitter
        </label>
      </section>
    ) : null;

    let jsFramework = state.database ? (
      <section className="fadeIn animated">
        <h3>JavaScript Framework</h3>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="jsFrameworkRadios" value="none" onChange={this.handleChange} defaultChecked={state.jsFramework === 'none'} /> None
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/react-logo.svg"></img>
          <input type="radio" name="jsFrameworkRadios" value="react" onChange={this.handleChange} defaultChecked={state.jsFramework === 'react'} /> React
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/angularjs-logo.png"></img>
          <input type="radio" name="jsFrameworkRadios" value="angular" onChange={this.handleChange} defaultChecked={state.jsFramework === 'angular'} /> AngularJS
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </section>
    ) : null;

    let reactOptions = state.jsFramework === 'react' ? (
      <section className="fadeIn animated">
        <h3>React Features</h3>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/alt-logo.png"></img>
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxAlt" onChange={this.handleChange} checked={state.reactOptions.has('fluxAlt')} /> Flux (Alt)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/flux-logo.svg"></img>
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxRedux" onChange={this.handleChange} checked={state.reactOptions.has('fluxRedux')} /> Flux (Redux)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/react-router-logo.png"></img>

          <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={this.handleChange} checked={state.reactOptions.has('reactRouter')} /> React Router
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/relay-logo.svg"></img>

          <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={this.handleChange} checked={state.reactOptions.has('graphql')} /> GraphQL + Relay
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/babel-logo.png"></img>

          <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={this.handleChange} checked={state.reactOptions.has('es6')} /> ES6
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </section>
    ) : null;

    let reactBuildSystem = state.jsFramework === 'react' ? (
      <section className="fadeIn animated">
        <h3>React Build System</h3>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/browserify-logo.svg"></img>

          <input type="radio" name="reactBuildSystemRadios" value="browserify" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'browserify'} /> Browserify / Gulp
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/webpack-logo.svg"></img>

          <input type="radio" name="reactBuildSystemRadios" value="webpack" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'webpack'} /> Webpack
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None Icon" />
          <input type="radio" name="reactBuildSystemRadios" value="none" onChange={this.handleChange} defaultChecked={state.reactBuildSystem === 'none'} /> None
        </label>
      </section>
    ) : null;

    let theme = state.jsFramework ? (
      <section className="fadeIn animated">
        <h3>Theme</h3>
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

    let download = (
      <div>
        <br/>
        <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and Download</button>
      </div>
    );

    return (
      <div className="container">
        <br/>

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
        <br/>
        <a className="twitter-share-button" href="https://twitter.com/intent/tweet">Tweet</a>&nbsp;
        <a className="twitter-follow-button" href="https://twitter.com/EvNowAndForever" data-show-count="false">
          Follow @EvNowAndForever</a>
      </div>
    );
  }
}

export default Home;
