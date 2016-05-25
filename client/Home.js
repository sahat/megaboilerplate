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
import { VelocityComponent } from 'velocity-react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerateLibraryName = this.handleGenerateLibraryName.bind(this);
    this.handleDisableAutoScroll = this.handleDisableAutoScroll.bind(this);
    this.handleReduceAnimations = this.handleReduceAnimations.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
    this.state = {};
  }

  componentDidMount() {
    try {
      const disableAutoScroll = localStorage.getItem('disableAutoScroll');
      const reduceAnimations = localStorage.getItem('reduceAnimations');
      this.setState({
        beginner: false,
        disableAutoScroll: disableAutoScroll === 'true',
        reduceAnimations: reduceAnimations === 'true',
        copyClipboardText: 'Copy to clipboard'
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
      console.info('Please select a platform.');
      return this.setState({ platformValidationError: 'Please select a platform.' });
    } else if (state.platform === 'html5' && !state.staticSiteGenerator) {
      console.info('Please select a static site generator.');
      return this.setState({ staticSiteGeneratorValidationError: 'Please select a static site generator.' });
    } else if (state.platform === 'library' && !state.jsLibraryName) {
      console.info('Please enter a library name.');
      return this.setState({ jsLibraryValidationError: 'Please enter a library name.' });
    } else if (state.platform === 'node' && !state.framework) {
      console.info('Please select a framework.');
      return this.setState({ frameworkValidationError: 'Please select a framework.' });
    } else if (state.platform === 'node' && !state.templateEngine) {
      console.info('Please select a template engine.');
      return this.setState({ templateEngineValidationError: 'Please select a template engine.' });
    } else if (state.platform === 'node' && !state.cssFramework) {
      console.info('Please select a CSS framework.');
      return this.setState({ cssFrameworkValidationError: 'Please select a CSS framework.' });
    } else if (state.platform === 'node' && !state.cssPreprocessor) {
      console.info('Please select a CSS preprocessor.');
      return this.setState({ cssPreprocessorValidationError: 'Please select a CSS preprocessor.' });
    } else if (state.platform === 'node' && !state.jsFramework) {
      console.info('Please make a selection.');
      return this.setState({ jsFrameworkValidationError: 'Please make a selection.' });
    } else if (state.platform === 'node' && state.jsFramework !== 'none' && !state.buildTool) {
      console.info('Please select a build tool.');
      return this.setState({ buildToolValidationError: 'Please select a build tool.' });
    } else if (state.platform === 'node' && !state.testing) {
      console.info('Please select a testing framework.');
      return this.setState({ testingValidationError: 'Please select a testing framework.' });
    } else if (state.platform === 'node' && !state.database) {
      console.info('Please select a database.');
      return this.setState({ databaseValidationError: 'Please select a database.' });
    } else if (state.platform === 'node' && !state.authentication && state.database !== 'none') {
      console.info('Please check all that apply.');
      return this.setState({ authenticationValidationError: 'Please check all that apply.' });
    }

    // Show next steps component
    this.setState({ showNextSteps: true });
    if (!state.disableAutoScroll) {
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
        const whitelist = ['showModal', 'beginner', 'disableAutoScroll', 'reduceAnimations', 'copyClipboardText'];
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            if (whitelist.indexOf(key) === -1) {
              state[key] = null;
            }
          }
        }
        state.platform = value;
        if (!state.disableAutoScroll) {
          $(refs.platform).velocity('scroll');
        }
        state.platformValidationError = null;
        break;

      case 'staticSiteGeneratorRadios':
        if (!state.staticSiteGenerator && !state.disableAutoScroll) {
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
        if (!state.framework && !state.disableAutoScroll) {
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
        if (!state.templateEngine && !state.disableAutoScroll) {
          $(refs.templateEngine).velocity('scroll');
        }
        state.templateEngineValidationError = null;
        state.templateEngine = value;
        break;

      case 'cssFrameworkRadios':
        if (!state.cssFramework && !state.disableAutoScroll) {
          $(refs.cssFramework).velocity('scroll');
        }
        if (state.cssPreprocessor) {
          state.cssPreprocessor = null;
        }
        state.cssFrameworkValidationError = null;
        state.cssFramework = value;
        break;

      case 'cssPreprocessorRadios':
        if (!state.cssPreprocessor && !state.disableAutoScroll) {
          $(refs.cssPreprocessor).velocity('scroll');
        }
        state.cssPreprocessor = value;
        state.cssPreprocessorValidationError = null;
        break;

      case 'jsFrameworkRadios':
        if (!state.jsFramework && !state.disableAutoScroll) {
          $(refs.jsFramework).velocity('scroll');
        }
        state.jsFramework = value;
        state.jsFrameworkValidationError = null;
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
        if (!state.buildTool && !state.disableAutoScroll) {
          $(refs.buildTool).velocity('scroll');
        }
        state.buildTool = value;
        state.buildToolValidationError = null;
        break;

      case 'testingRadios':
        if (!state.testing && !state.disableAutoScroll) {
          $(refs.testing).velocity('scroll');
        }
        state.testing = value;
        state.testingValidationError = null;
        break;

      case 'databaseRadios':
        if (!state.database && !state.disableAutoScroll) {
          $(refs.database).velocity('scroll');
        }
        if (value === 'none' && state.authentication) {
          state.authentication.clear();
        }
        state.database = value;
        state.authenticationValidationError = null;
        state.databaseValidationError = null;
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
          state.authenticationValidationError = null;
        } else {
          if (value === 'email' && requiresEmail) { return; }
          state.authentication.delete(value);
        }
        break;

      case 'deploymentRadios':
        if (!state.deployment && !state.disableAutoScroll) {
          $(refs.deployment).velocity('scroll');
        }
        state.deployment = value;
        break;

      default:
      // Handle default case
    }

    // reset download link state
    state.generateDownloadLinkSuccess = false;

    this.setState(state);
  }

  handleDisableAutoScroll(event) {
    this.setState({ disableAutoScroll: event.target.checked });
    try {
      localStorage.setItem('disableAutoScroll', event.target.checked);
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

  handleGenerateDownloadLink(event) {
    event.preventDefault();
    this.setState({
      generateDownloadLink: true,
      generateDownloadLinkInProgress: true
    });
    this.clickDownload();

    setTimeout(() => {
      this.setState({
        generateDownloadLinkSuccess: true,
        generateDownloadLinkInProgress: false
      });
    }, 1500)
  }


  copyDownloadLink(event) {
    const input = this.refs.downloadLinkInput;

    // select all text in the input
    $(input).focus();
    $(input).select();

    try {
      document.execCommand('copy');
      this.setState({ copyClipboardText: 'Copied!' });
    } catch (e) {
      this.setState({ copyClipboardText: 'Press ⌘ + C to copy' });
      console.warn('Copy to clipboard is not supported in Safari.')
    }
  }

  copyDownloadLinkMouseOut() {
    setTimeout(() => {
      this.setState({ copyClipboardText: 'Copy to clipboard' });
    }, 300)
  }

  render() {
    const state = this.state;
    const settingsCheckboxes = (
      <ul className="list-inline list-unstyled">
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="beginner" value="beginner" onChange={this.handleChange} checked={state.beginner} />
              <span>Beginner</span>
            </label>
          </div>
        </li>
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="disableAutoScroll" value="disableAutoScroll" onChange={this.handleDisableAutoScroll} checked={state.disableAutoScroll}/>
              <span>Disable auto-scroll</span>
            </label>
          </div>
        </li>
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="reduceAnimations" value="reduceAnimations" onChange={this.handleReduceAnimations} checked={state.reduceAnimations}/>
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


    let generateDownloadLink;

    if (this.state.generateDownloadLinkSuccess) {
      generateDownloadLink = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="input-group">
              <input type="text" ref="downloadLinkInput" className="form-control" value="https://megaboilerplate.blob.core.windows.net/megaboilerplate/megaboilerplate-foo.zip"/>
                <span className="input-group-btn">
                  <button onClick={this.copyDownloadLink.bind(this)} onMouseOut={this.copyDownloadLinkMouseOut.bind(this)} className="btn btn-default hint--bottom hint--rounded" type="button" data-hint={this.state.copyClipboardText}>
                    <img className="clipboard" src="/img/svg/clippy.svg" width="13" alt="Copy to clipboard"/>
                  </button>
                </span>
            </div>
            <p className="small text-muted text-right">This link will stay active for 24 hours.</p>
          </div>
          <br/>
        </div>
      );
    } else if (this.state.generateDownloadLinkInProgress) {
      generateDownloadLink = <p className="text-center"><i className="fa fa-spinner fa-spin"></i> Please wait...</p>;
    } else {
      generateDownloadLink = <p onClick={this.handleGenerateDownloadLink.bind(this)} className="text-center">or <a href="#" type="button">Generate Download Link</a></p>;
    }


    const download = (
      <div>
        <button ref="downloadBtn" className="btn btn-block btn-mega btn-success" onClick={this.clickDownload}>Compile and Download</button>
        {generateDownloadLink}
      </div>
    );

    const consulting = this.state.showNextSteps ? (
      <VelocityComponent runOnMount animation="transition.slideLeftIn" duration={900} delay={2100}>
        <div className="panel" style={{ opacity: 0 }}>
          <div className="panel-body">
            <i className="fa fa-skype"></i> Looking for additional help? <a href="https://calendly.com/sahat" target="_blank">Book a 1-on-1 Skype call</a>. Rates may vary.
          </div>
        </div>
      </VelocityComponent>
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
          <div ref="nextSteps">{nextSteps}</div>
          <div ref="consulting">{consulting}</div>
        </main>
        <Footer />
      </div>

    );
  }
}

export default Home;
