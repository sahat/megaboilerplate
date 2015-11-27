/* global JSZip saveAs */

let haikunate = require('haikunator');

import React from 'react';
import ReactDOM from 'react-dom';
import {clone} from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.generateAppName = this.generateAppName.bind(this);
    this.state = {};
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
    console.log('State', this.state);
  }

  generateAppName() {
    let state = this.state;
    state.appName = haikunate({ tokenLength: 0 });
    this.setState(state);

    this.refs.appNameInput.focus();
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
        state.cssFramework = value;
        break;
      case 'cssPreprocessorRadios':
        state.cssPreprocessor = value;
        break;
      case 'databaseRadios':
        state.database = value;
        break;
      case 'authenticationCheckboxes':
        state.authentication = state.authentication || new Set();
        if (isChecked) {
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

    let platform = (
      <div>
        <h3>Platform</h3>
        <label className="radio-inline">
          <input type="radio" name="platformRadios" value="node" onChange={this.handleChange} /> Node.js
        </label>
      </div>
    );

    let framework = this.state.platform ? (
      <div className="fadeIn animated">
        <h3>Framework</h3>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="express" onChange={this.handleChange} /> Express
        </label>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="hapi" onChange={this.handleChange} /> Hapi
        </label>
        <label className="radio-inline">
          <input type="radio" name="frameworkRadios" value="sails" onChange={this.handleChange} /> Sails.js
        </label>

        <br/>
        <br/>
      

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="appNameInput">App Name (optional)</label>
            <div className="input-group">
              <input type="text" ref="appNameInput" className="form-control" value={this.state.appName} placeholder="App Name" autoFocus />
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
          <input type="radio" name="templateEngineRadios" value="none" onChange={this.handleChange} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="jade" onChange={this.handleChange} /> Jade
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="handlebars" onChange={this.handleChange} /> Handlebars
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
        <label className="radio-inline">
          <input type="radio" name="templateEngineRadios" value="swig" onChange={this.handleChange} /> Swig
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
        </label>
      </div>
    ) : null;

    let cssFramework = this.state.templateEngine ? (
      <div className="fadeIn animated">
        <h3>CSS Framework</h3>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="none" onChange={this.handleChange} /> None
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapCss" onChange={this.handleChange} /> Bootstrap (CSS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapLess" onChange={this.handleChange} /> Bootstrap (LESS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bootstrapSass" onChange={this.handleChange} /> Bootstrap (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="foundationCss" onChange={this.handleChange} /> Foundation (CSS)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="foundationSass" onChange={this.handleChange} /> Foundation (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="cssFrameworkRadios" value="bourbonNeat" onChange={this.handleChange} /> Bourbon + Neat (Sass)
            <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." />
          </label>
        </div>
      </div>
    ) : null;

    let cssPreprocessor = this.state.cssFramework === 'none' ? (
      <div className="fadeIn animated">
        <h3>CSS Preprocessor</h3>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="none" onChange={this.handleChange} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="css" onChange={this.handleChange} /> CSS
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="sass" onChange={this.handleChange} /> Sass
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="less" onChange={this.handleChange} /> LESS
        </label>
        <label className="radio-inline">
          <input type="radio" name="cssPreprocessorRadios" value="postcss" onChange={this.handleChange} /> PostCSS
        </label>
      </div>
    ) : null;

    let database = this.state.templateEngine ? (
      <div className="fadeIn animated">
        <h3>Database</h3>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="none" onChange={this.handleChange} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="mongodb" onChange={this.handleChange} /> MongoDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="mysql" onChange={this.handleChange} /> MySQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="postgresql" onChange={this.handleChange} /> PostgreSQL
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="databaseRadios" value="rethinkdb" onChange={this.handleChange} /> RethinkDB
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let authentication = this.state.database ? (
      <div className="fadeIn animated">
        <h3>Authentication</h3>
        <label className="checkbox-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="email" onChange={this.handleChange} /> Email / Password
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="facebook" onChange={this.handleChange} /> Facebook
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="google" onChange={this.handleChange} /> Google
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="authenticationCheckboxes" value="twitter" onChange={this.handleChange} /> Twitter
        </label>
      </div>
    ) : null;

    let jsFramework = this.state.authentication ? (
      <div className="fadeIn animated">
        <h3>JavaScript Framework</h3>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="none" onChange={this.handleChange} /> None
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="jquery" onChange={this.handleChange} /> jQuery
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="react" onChange={this.handleChange} /> React
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="jsFrameworkRadios" value="angular" onChange={this.handleChange} /> AngularJS
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let reactOptions = this.state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h3>React Features</h3>
        <label className="checkbox-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxAlt" onChange={this.handleChange} /> Flux (Alt)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="checkbox-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="fluxRedux" onChange={this.handleChange} /> Flux (Redux)
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="reactRouter" onChange={this.handleChange} /> React Router
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="graphql" onChange={this.handleChange} /> GraphQL + Relay
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="checkbox" name="reactOptionsCheckboxes" value="es6" onChange={this.handleChange} /> ES6
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
      </div>
    ) : null;

    let reactBuildSystem = this.state.jsFramework === 'react' ? (
      <div className="fadeIn animated">
        <h3>React Build System</h3>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="browserify" onChange={this.handleChange} /> Browserify
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="webpack" onChange={this.handleChange} /> Webpack
          <i className="ion-help-circled" data-container="body" data-toggle="popover" data-placement="top" data-content="Lorem" />
        </label>
        <label className="radio-inline">
          <input type="radio" name="reactBuildSystemRadios" value="none" onChange={this.handleChange} /> None
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
