/* global $, localStorage */

import haikunate from 'haikunator';
import React from 'react';
import { clone } from 'lodash';
import Header from './Header';
import Footer from './Footer';
import Platform from './sections/Platform';
import StaticSiteGenerator from './sections/StaticSiteGenerator';
import JsLibrary from './sections/JsLibrary';
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
import NextSteps from './sections/NextSteps';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerateLibraryName = this.handleGenerateLibraryName.bind(this);
    this.handleAutoScroll = this.handleAutoScroll.bind(this);
    this.handleReduceAnimations = this.handleReduceAnimations.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.state = {};;
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

    if (!state.platform) {
      return this.setState({ platformValidationError: 'Please select a platform.' });
    }

    if (state.platform === 'html5' && !state.staticSiteGenerator) {
      return this.setState( { staticSiteGeneratorValidationError: 'Please select a static site generator.' });
    }

    if (state.platform === 'library' && !state.jsLibraryName) {
      return this.setState( { jsLibraryValidationError: 'Please enter or generate a library name.' });
    }

    if (state.platform === 'node' && !state.framework) {
      return this.setState({ frameworkValidationError: 'Please select a framework.' });
    }

    //   !state.framework ||
    // !state.templateEngine ||
    // !state.cssFramework ||
    // )

    // Show next steps component
    this.setState({ showNextSteps: true });
    if (state.autoScroll) {
      $(this.refs.nextSteps).velocity('scroll');
    }

    const data = clone(state);
    data.appName = haikunate({ tokenLength: 0 });

    if (data.jsFramework === 'none') {
      data.jsFramework = null;
    }

    // Convert ES6 set to array
    data.authentication = data.authentication ? Array.from(data.authentication) : [];
    data.frameworkOptions = data.frameworkOptions ? Array.from(data.frameworkOptions) : [];
    data.reactOptions = data.reactOptions ? Array.from(data.reactOptions) : [];
    data.jsLibraryOptions = data.jsLibraryOptions ? Array.from(data.jsLibraryOptions) : [];

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

  handleGenerateLibraryName() {
    const newState = clone(this.state);
    newState.jsLibraryName = haikunate({ tokenLength: 0 });
    newState.jsLibraryValidationError = null;
    this.setState(newState);
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
        const whitelist = ['showModal', 'beginner', 'autoScroll', 'reduceAnimations'];
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            if (whitelist.indexOf(key) === -1) {
              state[key] = null;
            }
          }
        }
        state.platform = value;
        if (state.autoScroll) {
          $(refs.platform).velocity('scroll');
        }
        state.platformValidationError = null;
        break;

      case 'staticSiteGeneratorRadios':
        if (!state.staticSiteGenerator && state.autoScroll) {
          $(refs.staticSiteGenerator).velocity('scroll');
        }
        state.staticSiteGenerator = value;
        state.staticSiteGeneratorValidationError = null;
        break;

      case 'jsLibraryOptionsCheckboxes':
        state.jsLibraryOptions = state.jsLibraryOptions || new Set();
        if (isChecked) {
          state.jsLibraryOptions.add(value);
        } else {
          state.jsLibraryOptions.delete(value);
        }
        break;

      case 'jsLibraryName':
        state.jsLibraryName = value;
        state.jsLibraryValidationError = null;
        break;

      case 'jsLibraryAuthor':
        state.jsLibraryAuthor = value;
        break;

      case 'jsLibraryGithubUsername':
        state.jsLibraryGithubUsername = value;
        break;


      case 'jsLibraryLicenseRadios':
        state.jsLibraryLicense = value;
        break;

      case 'frameworkRadios':
        if (!state.framework && state.autoScroll) {
          $(refs.framework).velocity('scroll');
        }
        state.framework = value;
        state.frameworkValidationError = null;

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
            if (value === 'facebook' || value === 'google' || value === 'twitter') {
              state.authentication.add('email');
            }
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
              <span>Beginner-friendly Stack</span>
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
      <Platform {...state} handleChange={this.handleChange}/>
    );

    const staticSiteGenerator = state.platform === 'html5' ? (
      <StaticSiteGenerator {...state} handleChange={this.handleChange}/>
    ) : null;

    const jsLibrary = state.platform === 'library' ? (
      <JsLibrary {...state} handleChange={this.handleChange} handleGenerateLibraryName={this.handleGenerateLibraryName}/>
    ) : null;

    const framework = state.platform === 'node' ? (
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

    const jsFramework = state.cssPreprocessor  && state.platform === 'node' ? (
      <JsFramework {...state} handleChange={this.handleChange}/>
    ) : null;

    const buildTool = ((state.jsFramework && state.jsFramework !== 'none') || (state.cssPreprocessor && state.cssPreprocessor !== 'css')) && state.platform === 'node' ? (
      <BuildTool {...state} handleChange={this.handleChange}/>
    ) : null;

    const testing = (state.buildTool || state.cssPreprocessor === 'css' && state.jsFramework === 'none') && state.platform === 'node' ? (
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
    //
    // const download = state.deployment || state.staticSiteGenerator || state.platform === 'library' ? (
    //   <button ref="downloadBtn" className="btn btn-block btn-mega btn-success" onClick={this.clickDownload}>Compile and
    //     Download</button>
    // ) : null;


    const download = (
      <button ref="downloadBtn" className="btn btn-block btn-mega btn-success" onClick={this.clickDownload}>Compile and
        Download</button>
    );

    const consulting = download ? (
      <div className="panel">
        <div className="panel-body">
          <i className="fa fa-phone"></i> Request 1-on-1 consulting service. Rates may vary.
        </div>
      </div>
    ) : null;

    const nextSteps = state.showNextSteps ? (
      <NextSteps {...state}/>
    ) : null;
    
    return (
      <div>
        <Header />
        <main className="container">
          {settingsCheckboxes}
          <div ref="platform">{platform}</div>
          <div ref="framework">{framework}</div>
          <div ref="staticSiteGenerator">{staticSiteGenerator}</div>
          <div ref="jsLibrary">{jsLibrary}</div>
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
          <div ref="consulting">{consulting}</div>
          <div ref="nextSteps">{nextSteps}</div>
        </main>
        <Footer />
      </div>

    );
  }
}

export default Home;
