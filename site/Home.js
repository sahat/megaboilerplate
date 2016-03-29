/* global $, localStorage */

const haikunate = require('haikunator');
import React from 'react';
import { clone } from 'lodash';
import { VelocityTransitionGroup } from 'velocity-react';

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
    this.handleAutoScroll = this.handleAutoScroll.bind(this);
    this.handleReduceAnimations = this.handleReduceAnimations.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  componentDidMount() {
    try {
      const autoScroll = localStorage.getItem('autoScroll');
      const reduceAnimations = localStorage.getItem('reduceAnimations');
      this.setState({
        autoScroll: autoScroll === 'true',
        reduceAnimations: reduceAnimations === 'true'
      });
    } catch (e) {
      console.warn(e);
    }
  }

  clickDownload() {
    const state = this.state;
    const downloadBtn = this.refs.downloadBtn;

    // Google Analytics event
    // ga("send","event","Customize","Download","Customize and Download")

    this.setState({
      showGettingStartedButton: true
    });

    const data = clone(state);
    data.appName = haikunate({ tokenLength: 0 });

    if (data.jsFramework === 'none') {
      data.jsFramework = null;
    }

    // Convert ES6 set to array
    data.authentication = data.authentication ? Array.from(data.authentication) : [];

    // Convert ES6 set to array
    data.frameworkOptions = data.frameworkOptions ? Array.from(data.frameworkOptions) : [];

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

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const isChecked = event.target.checked;
    const state = clone(this.state);
    const refs = this.refs;

    switch (name) {
      case 'beginner':
        state.beginner = isChecked;
        break;

      case 'platformRadios':
        state.platform = value;
        if (state.autoScroll) {
          $(refs.platform).velocity('scroll');
        }
        break;

      case 'frameworkRadios':
        if (!state.framework && state.autoScroll) {
          $(refs.framework).velocity('scroll');
        }
        state.framework = value;
        break;

      case 'frameworkOptionsCheckboxes':
        state.frameworkOptions = state.frameworkOptions || new Set();
        if (isChecked) {
          state.frameworkOptions.add(value);
        } else {
          state.frameworkOptions.delete(value);
        }
        break;

      case 'templateEngineRadios':
        if (!state.templateEngine && state.autoScroll) {
          $(refs.templateEngine).velocity('scroll');
        }
        state.templateEngine = value;
        break;

      case 'cssFrameworkRadios':
        if (!state.cssFramework && state.autoScroll) {
          $(refs.cssFramework).velocity('scroll');
        }
        if (state.cssPreprocessor) {
          state.cssPreprocessor = null;
        }
        state.cssFramework = value;
        break;

      case 'cssPreprocessorRadios':
        if (!state.cssPreprocessor && state.autoScroll) {
          $(refs.cssPreprocessor).velocity('scroll');
        }
        state.cssPreprocessor = value;
        break;

      case 'jsFrameworkRadios':
        if (!state.jsFramework && state.autoScroll) {
          $(refs.jsFramework).velocity('scroll');
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

      case 'buildToolRadios':
        if (!state.buildTool && state.autoScroll) {
          $(refs.buildTool).velocity('scroll');
        }
        state.buildTool = value;
        break;

      case 'testingRadios':
        if (!state.testing && state.autoScroll) {
          $(refs.testing).velocity('scroll');
        }
        state.testing = value;
        break;

      case 'databaseRadios':
        if (!state.database && state.autoScroll) {
          $(refs.database).velocity('scroll');
        }
        if (value === 'none' && state.authentication) {
          state.authentication.clear();
          state.authentication.add('none');
        }
        state.database = value;
        break;

      case 'authenticationCheckboxes':
        state.authentication = state.authentication || new Set();

        const requiresEmail = (
          state.authentication.has('facebook') ||
          state.authentication.has('google') ||
          state.authentication.has('twitter')
        );

        if (isChecked) {
          if (value === 'none') {
            state.authentication.clear();
          } else {
            state.authentication.add(value);
          }
        } else {
          if (value === 'email' && requiresEmail) { return; }
          state.authentication.delete(value);
        }
        break;

      case 'deploymentRadios':
        if (!state.deployment && state.autoScroll) {
          $(refs.deployment).velocity('scroll');
        }
        state.deployment = value;
        break;

      default:
      // Handle default case
    }

    this.setState(state);
  }

  handleAutoScroll(event) {
    this.setState({ autoScroll: !event.target.checked });
    try {
      localStorage.setItem('autoScroll', !event.target.checked);
    } catch(e) {
      console.warn(e);
    }
  }

  handleReduceAnimations(event) {
    this.setState({ reduceAnimations: event.target.checked });
    try {
      localStorage.setItem('reduceAnimations', event.target.checked);
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const state = this.state;
    const settingsCheckboxes = (
      <ul className="list-inline list-unstyled">
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="beginner" value={state.beginner} onChange={this.handleChange}/>
              <span>I am Beginner</span>
            </label>
          </div>
        </li>
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="autoScroll" value={state.autoScroll} onChange={this.handleAutoScroll} checked={!state.autoScroll}/>
              <span>Disable auto-scroll</span>
            </label>
          </div>
        </li>
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="reduceAnimations" value={state.reduceAnimations} onChange={this.handleReduceAnimations} checked={state.reduceAnimations}/>
              <span>Reduce Animations</span>
            </label>
          </div>
        </li>
      </ul>
    );

    const platform = (
      <Platform platform={state.platform} handleChange={this.handleChange}/>
    );

    const framework = state.platform ? (
      <Framework {...state} handleChange={this.handleChange}/>
    ) : null;

    const templateEngine = state.framework ? (
      <TemplateEngine {...state} handleChange={this.handleChange}/>
    ) : null;

    const cssFramework = state.templateEngine ? (
      <CssFramework {...state} handleChange={this.handleChange}/>
    ) : null;

    const cssPreprocessor = state.cssFramework ? (
      <CssPreprocessor {...state} handleChange={this.handleChange}/>
    ) : null;

    const jsFramework = state.cssPreprocessor ? (
      <JsFramework {...state} handleChange={this.handleChange}/>
    ) : null;

    const buildTool = state.jsFramework ? (
      <BuildTool {...state} handleChange={this.handleChange}/>
    ) : null;

    const testing = state.buildTool ? (
      <Testing {...state} handleChange={this.handleChange}/>
    ) : null;

    const database = state.testing ? (
      <Database {...state} handleChange={this.handleChange}/>
    ) : null;

    const authentication = state.database ? (
      <Authentication {...state} handleChange={this.handleChange}/>
    ) : null;

    const deployment = (state.authentication || state.database === 'none') ? (
      <Deployment {...state} handleChange={this.handleChange}/>
    ) : null;

    const download = state.deployment ? (
      <button ref="downloadBtn" className="btn btn-block btn-mega btn-success" onClick={this.clickDownload}>Compile and
        Download</button>
    ) : null;

    const consulting = state.deployment ? (
      <div className="panel">
        <div className="panel-body">
          <i className="fa fa-phone"></i> Request 1-on-1 consulting service. Rates may vary.
        </div>
      </div>
    ) : null;

    const gettingStarted = state.showGettingStartedButton ? (
      <a href="#" className="btn btn-block btn-mega btn-primary">Getting Started Instructions</a>
    ) : null;

    return (
      <div>
        <Header />
        <main className="container">
          {settingsCheckboxes}
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
          <div ref="getting-started">{gettingStarted}</div>
          <div ref="consulting">{consulting}</div>
        </main>
        <Footer />
      </div>

    );
  }
}

export default Home;
