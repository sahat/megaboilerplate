import haikunate from 'haikunator';
import React from 'react';
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
    this.clickDownload = this.clickDownload.bind(this);
    this.state = {};
  }

  componentDidMount() {
    // require it here to avoid "window is not defined" error during server-side rendering
    const swal = require('sweetalert');

    try {
      const disableAutoScroll = localStorage.getItem('disableAutoScroll');
      this.setState({
        beginner: false,
        disableAutoScroll: disableAutoScroll === 'true',
        copyClipboardText: 'Copy to clipboard',
        isDownloadLoading: false
      });
    } catch (e) {
      console.warn(e);
    }
  }

  clickDownload(options = {}) {
    const state = this.state;

    if (!state.platform) {
      console.info('Please select a platform.');
      return this.setState({
        platformValidationError: 'Please select a platform.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'html5' && !state.staticSiteGenerator) {
      console.info('Please select a static site generator.');
      return this.setState({
        staticSiteGeneratorValidationError: 'Please select a static site generator.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'library' && !state.jsLibraryName) {
      console.info('Please enter a library name.');
      return this.setState({
        jsLibraryValidationError: 'Please enter a library name.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.framework) {
      console.info('Please select a framework.');
      return this.setState({
        frameworkValidationError: 'Please select a framework.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.cssFramework) {
      console.info('Please select a CSS framework.');
      return this.setState({
        cssFrameworkValidationError: 'Please select a CSS framework.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.cssPreprocessor) {
      console.info('Please select a CSS preprocessor.');
      return this.setState({
        cssPreprocessorValidationError: 'Please select a CSS preprocessor.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.jsFramework) {
      console.info('Please make a selection.');
      return this.setState({
        jsFrameworkValidationError: 'Please make a selection.',
        generateDownloadLinkInProgress: false
      });

    } else if (state.platform === 'node' && !state.templateEngine && state.jsFramework !== 'angularjs') {
      console.info('Please select a template engine.');
      return this.setState({
        templateEngineValidationError: 'Please select a template engine.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && state.jsFramework !== 'none' && !state.buildTool) {
      console.info('Please select a build tool.');
      return this.setState({
        buildToolValidationError: 'Please select a build tool.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.testing) {
      console.info('Please select a testing framework.');
      return this.setState({
        testingValidationError: 'Please select a testing framework.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.database) {
      console.info('Please select a database.');
      return this.setState({
        databaseValidationError: 'Please select a database.',
        generateDownloadLinkInProgress: false
      });
    } else if (state.platform === 'node' && !state.authentication && state.database !== 'none') {
      console.info('Please check all that apply.');
      return this.setState({
        authenticationValidationError: 'Please check all that apply.',
        generateDownloadLinkInProgress: false
      });
    }

    // Show download button spinner
    if (!options.generateDownloadLink) {
      this.setState({ isDownloadLoading: true });
    }

    // Show next steps component
    this.setState({ showNextSteps: true });
    if (!state.disableAutoScroll) {
      if (options.generateDownloadLink) {
        $(this.refs.download).velocity('scroll');
      } else {
        $(this.refs.nextSteps).velocity('scroll');

      }
    }

    const data = Object.assign({}, state);
    data.appName = haikunate({ tokenLength: 0 });

    if (data.jsFramework === 'none') {
      data.jsFramework = null;
    }

    if (options.generateDownloadLink) {
      data.generateDownloadLink = true;
    }

    // Convert ES6 set to array
    data.authentication = data.authentication ? Array.from(data.authentication) : [];
    data.frameworkOptions = data.frameworkOptions ? Array.from(data.frameworkOptions) : [];
    data.cssPreprocessorOptions = data.cssPreprocessorOptions ? Array.from(data.cssPreprocessorOptions) : [];
    data.reactOptions = data.reactOptions ? Array.from(data.reactOptions) : [];
    data.jsLibraryOptions = data.jsLibraryOptions ? Array.from(data.jsLibraryOptions) : [];

    ga('send', 'event', 'Mega Boilerplate', 'Download', 'Downloads');

    if (options.generateDownloadLink) {
      ga('send', 'event', 'Mega Boilerplate', 'Download', 'Generated Links');
      $.ajax({
        url: '/download',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      }).done((response, status, request) => {
        this.setState({
          downloadLinkInputValue: response.link,
          generateDownloadLinkSuccess: true,
          generateDownloadLinkInProgress: false
        });
        $(this.refs.downloadLinkInput).focus();
      }).fail((jqXHR) => {
        this.setState({
          generateDownloadLinkSuccess: false,
          generateDownloadLinkInProgress: false
        });
        const title = encodeURIComponent(jqXHR.responseJSON.message);
        const body = encodeURIComponent('\n##### :boom: Error Stack Trace\n' + '\`\`\`js\n' + jqXHR.responseJSON.stack + '\n\`\`\`');
        swal({
          title: 'Server Error',
          text: `${jqXHR.responseJSON.message}<br><strong><a href='https://github.com/sahat/megaboilerplate/issues/new?title=${title}&body=${body}' target="_blank">Report a bug</a></strong>`,
          type: 'error',
          html: true
        });
      });
    } else {
      $.ajax({
        url: '/download',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
      }).done((response, status, request) => {
        const disp = request.getResponseHeader('Content-Disposition');
        if (disp && disp.search('attachment') !== -1) {
          this.setState({ isDownloadLoading: false });

          const form = $('<form method="POST" action="/download">');
          $.each(data, (k, v) => {
            if (v) {
              form.append($(`<input type="hidden" name="${k}" value="${v}">`));
            }
          });
          $('body').append(form);
          form.submit();
        }
      }).fail((jqXHR) => {
        const title = encodeURIComponent(jqXHR.responseJSON.message);
        const body = encodeURIComponent('\n##### :boom: Error Stack Trace\n' + '\`\`\`js\n' + jqXHR.responseJSON.stack + '\n\`\`\`');
        swal({
          title: 'Server Error',
          text: `${jqXHR.responseJSON.message}<br><strong><a href='https://github.com/sahat/megaboilerplate/issues/new?title=${title}&body=${body}' target="_blank">Report a bug</a></strong>`,
          type: 'error',
          html: true
        });
        this.setState({ isDownloadLoading: false });
      });
    }
  }

  handleGenerateLibraryName() {
    const newState = Object.assign({}, this.state);
    newState.jsLibraryName = haikunate({ tokenLength: 0 });
    newState.jsLibraryValidationError = null;
    this.setState(newState);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const isChecked = event.target.checked;
    const state = Object.assign({}, this.state);
    const refs = this.refs;

    switch (name) {
      case 'beginner':
        state.beginner = isChecked;
        if (isChecked) {
          ga('send', 'event', 'Mega Boilerplate', 'Site Options', 'Beginner');
        }
        break;

      case 'platformRadios':
        const whitelist = ['beginner', 'disableAutoScroll', 'copyClipboardText', 'isDownloadLoading'];
        for (const key in state) {
          if (state.hasOwnProperty(key)) {
            if (whitelist.indexOf(key) === -1) {
              state[key] = null;
            }
          }
        }
        ga('send', 'event', 'Mega Boilerplate', 'Platform', value);
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
        ga('send', 'event', 'Mega Boilerplate', 'Static Site', value);
        state.staticSiteGenerator = value;
        state.staticSiteGeneratorValidationError = null;
        break;

      case 'jsLibraryOptionsCheckboxes':
        state.jsLibraryOptions = state.jsLibraryOptions || new Set();
        if (isChecked) {
          state.jsLibraryOptions.add(value);
          ga('send', 'event', 'Mega Boilerplate', 'JS Library', value);
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
        ga('send', 'event', 'Mega Boilerplate', 'JS Library', value);
        break;

      case 'frameworkRadios':
        if (!state.framework && !state.disableAutoScroll) {
          $(refs.framework).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'Framework', value);
        state.framework = value;
        state.frameworkValidationError = null;

        break;

      case 'frameworkOptionsCheckboxes':
        state.frameworkOptions = state.frameworkOptions || new Set();
        if (isChecked) {
          state.frameworkOptions.add(value);
          ga('send', 'event', 'Mega Boilerplate', 'Framework', value);
        } else {
          state.frameworkOptions.delete(value);
        }
        break;

      case 'templateEngineRadios':
        if (!state.templateEngine && !state.disableAutoScroll) {
          $(refs.templateEngine).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'Template Engine', value);
        state.templateEngine = value;
        state.templateEngineValidationError = null;
        break;

      case 'cssFrameworkRadios':
        if (!state.cssFramework && !state.disableAutoScroll) {
          $(refs.cssFramework).velocity('scroll');
        }
        if (state.cssPreprocessor) {
          state.cssPreprocessor = null;
        }
        ga('send', 'event', 'Mega Boilerplate', 'CSS Framework', value);
        state.cssFramework = value;
        state.cssFrameworkValidationError = null;
        break;

      case 'cssPreprocessorRadios':
        if (!state.cssPreprocessor && !state.disableAutoScroll) {
          $(refs.cssPreprocessor).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'CSS Preprocessor', value);
        state.cssPreprocessor = value;
        state.cssPreprocessorValidationError = null;
        state.buildTool = null;
        break;

      case 'cssPreprocessorOptionsCheckboxes':
        state.cssPreprocessorOptions = state.cssPreprocessorOptions || new Set();
        if (isChecked) {
          state.cssPreprocessorOptions.add(value);
          ga('send', 'event', 'Mega Boilerplate', 'CSS Preprocessor', value);
        } else {
          state.cssPreprocessorOptions.delete(value);
        }
        break;

      case 'jsFrameworkRadios':
        if (!state.jsFramework && !state.disableAutoScroll) {
          $(refs.jsFramework).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'JS Framework', value);
        state.jsFramework = value;
        state.jsFrameworkValidationError = null;
        state.testing = null;
        state.buildTool = null;
        break;

      case 'reactOptionsCheckboxes':
        state.reactOptions = state.reactOptions || new Set();
        if (isChecked) {
          state.reactOptions.add(value);
          ga('send', 'event', 'Mega Boilerplate', 'JS Framework', value);
        } else {
          state.reactOptions.delete(value);
        }
        break;

      case 'buildToolRadios':
        if (!state.buildTool && !state.disableAutoScroll) {
          $(refs.buildTool).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'Build Tool', value);
        state.buildTool = value;
        state.buildToolValidationError = null;
        break;

      case 'testingRadios':
        if (!state.testing && !state.disableAutoScroll) {
          $(refs.testing).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'Testing', value);
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
        ga('send', 'event', 'Mega Boilerplate', 'Database', value);
        state.database = value;
        state.authenticationValidationError = null;
        state.databaseValidationError = null;
        break;

      case 'authenticationCheckboxes':
        state.authentication = state.authentication || new Set();

        const requiresEmail = (
          state.authentication.has('facebook') ||
          state.authentication.has('google') ||
          state.authentication.has('twitter') ||
          state.authentication.has('github')
        );

        if (isChecked) {
          ga('send', 'event', 'Mega Boilerplate', 'Authentication', value);

          if (value === 'none') {
            state.authentication.clear();
          } else {
            state.authentication.add(value);
            if (value === 'facebook' || value === 'google' || value === 'twitter' || value === 'github') {
              state.authentication.add('email');
            }
          }
          state.authenticationValidationError = null;
        } else {
          if (value === 'email' && requiresEmail) {
            return;
          }
          state.authentication.delete(value);
        }
        break;

      case 'deploymentRadios':
        if (!state.deployment && !state.disableAutoScroll) {
          $(refs.deployment).velocity('scroll');
        }
        ga('send', 'event', 'Mega Boilerplate', 'Deployment', value);
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
    if (event.target.checked) {
      ga('send', 'event', 'Mega Boilerplate', 'Site Options', 'Disable Auto-Scroll');
    }
    this.setState({ disableAutoScroll: event.target.checked });
    try {
      localStorage.setItem('disableAutoScroll', event.target.checked);
    } catch (e) {
      console.warn(e);
    }
  }

  handleGenerateDownloadLink(event) {
    event.preventDefault();
    this.setState({ generateDownloadLinkInProgress: true });
    this.clickDownload({ generateDownloadLink: true });
  }


  handleClickDownloadLink(event) {
    const input = this.refs.downloadLinkInput;
    $(input).focus();
    input.setSelectionRange(0, 9999);
  }

  copyDownloadLink(event) {
    const input = this.refs.downloadLinkInput;

    // select all text in the input
    $(input).focus();
    input.setSelectionRange(0, 9999);

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
      <ul className="list-inline list-unstyled clearfix">
        <li>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="beginner" value="beginner" onChange={this.handleChange} checked={state.beginner}/>
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
        <li className="pull-right">
          <div className="checkbox">
            <a href="https://www.codementor.io/sahatyalkabov?utm_source=github&utm_medium=button&utm_term=sahatyalkabov&utm_campaign=github" target="_blank"><img src="https://cdn.codementor.io/badges/book_session_github.svg" alt="Book session on Codementor"/></a>
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

    const cssFramework = state.framework ? (
      <CssFramework {...state} handleChange={this.handleChange}/>
    ) : null;

    const cssPreprocessor = state.cssFramework ? (
      <CssPreprocessor {...state} handleChange={this.handleChange}/>
    ) : null;

    const jsFramework = state.cssPreprocessor && state.platform === 'node' ? (
      <JsFramework {...state} handleChange={this.handleChange}/>
    ) : null;

    const templateEngine = state.jsFramework && state.jsFramework !== 'angularjs' ? (
      <TemplateEngine {...state} handleChange={this.handleChange}/>
    ) : null;

    const buildTool = (state.jsFramework || (state.jsFramework && state.cssPreprocessor)) && state.platform === 'node' ? (
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


    let generateDownloadLink;

    const loadingSvgColor = state.isDownloadLoading ? '#fff' : '#000';
    const loadingSvg = (
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28px" height="28px" viewBox="0 0 40 40">
        <path opacity="0.2" fill={loadingSvgColor} d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill={loadingSvgColor} d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 20 20"
                            to="360 20 20"
                            dur="0.5s"
                            repeatCount="indefinite"/>
        </path>
      </svg>
    );

    if (this.state.generateDownloadLinkSuccess) {
      generateDownloadLink = (
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <div className="input-group">
              <input type="text" ref="downloadLinkInput" onClick={this.handleClickDownloadLink.bind(this)} className="form-control" defaultValue={state.downloadLinkInputValue} readOnly/>
                <span className="input-group-btn">
                  <button onClick={this.copyDownloadLink.bind(this)} onMouseOut={this.copyDownloadLinkMouseOut.bind(this)} className="btn btn-default hint--bottom hint--rounded" type="button" data-hint={this.state.copyClipboardText}>
                    <img className="clipboard" src="https://megaboilerplate.blob.core.windows.net/megaboilerplate/img/svg/clippy.svg" width="13" alt="Copy to clipboard"/>
                  </button>
                </span>
            </div>
            <p className="small text-muted text-right">This link will stay active for 24 hours</p>
          </div>
          <br/>
        </div>
      );
    } else if (this.state.generateDownloadLinkInProgress) {
      generateDownloadLink = (
        <div className="text-center">
          <div className="loader">
            {loadingSvg}
            <span>Please wait...</span>
          </div>
        </div>
      );
    } else {
      generateDownloadLink = (
        <div>
          <p onClick={this.handleGenerateDownloadLink.bind(this)} className="text-center">or <a href="#" type="button">Generate Download Link</a></p>
        </div>
      );
    }

    const downloadText = state.isDownloadLoading ? loadingSvg : (
      <span><i className="fa fa-download"></i> Compile and Download</span>
    );
    const download = state.deployment || state.staticSiteGenerator || state.platform === 'library' || state.platform === 'electron' ? (
      <div>
        <button ref="downloadBtn" className="btn btn-block btn-mega btn-success" onClick={this.clickDownload}>{downloadText}</button>
        {generateDownloadLink}
      </div>
    ) : null;

    const nextSteps = state.showNextSteps ? (
      <NextSteps {...state}/>
    ) : null;

    return (
      <div ref="wrapper">
        <Header />
        <main className="container">
          {settingsCheckboxes}
          <div ref="platform">{platform}</div>
          <div ref="framework">{framework}</div>
          <div ref="staticSiteGenerator">{staticSiteGenerator}</div>
          <div ref="jsLibrary">{jsLibrary}</div>
          <div ref="cssFramework">{cssFramework}</div>
          <div ref="cssPreprocessor">{cssPreprocessor}</div>
          <div ref="jsFramework">{jsFramework}</div>
          <div ref="templateEngine">{templateEngine}</div>
          <div ref="buildTool">{buildTool}</div>
          <div ref="testing">{testing}</div>
          <div ref="database">{database}</div>
          <div ref="authentication">{authentication}</div>
          <div ref="deployment">{deployment}</div>
          <div ref="download">{download}</div>
          <div ref="nextSteps">{nextSteps}</div>

        </main>
        <Footer />

        <div className="modal" id="demosModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel"><i className="fa fa-globe"></i> Live Demos</h4>
              </div>
              <div className="modal-body">
                <a href="http://megaboilerplate-demo1.azurewebsites.net/" className="demo-container demo1" target="_blank">
                  <p><span><strong>Demo 1</strong> - Traditional Express web app</span>
                    <img src="https://megaboilerplate.blob.core.windows.net/megaboilerplate/img/svg/recommended.svg" alt="Recommended"/>
                  </p>
                  <span className="text-normal">Node - Jade - Bootstrap - Sass - Mocha - MongoBD - Facebook - Google - Twitter - VK</span>
                </a>
                <a href="http://megaboilerplate-demo2.azurewebsites.net/" className="demo-container demo2" target="_blank">
                  <p><span><strong>Demo 2</strong> - MEAN stack</span></p>
                  <span className="text-normal">Node - Handlebars - Foundation - AngularJS - Gulp - Jasmine - MongoDB - Facebook - Google</span>
                </a>
                <a href="http://megaboilerplate-demo3.azurewebsites.net/ " className="demo-container demo3" target="_blank">
                  <p><span><strong>Demo 3</strong> - Full-stack React app (unstyled)</span></p>
                  <span className="text-normal">Node - Nunjucks - CSSNext - PostCSS - React - Webpack - Mocha - SQLite - Twitter</span>
                </a>
                <a href="https://github.com/sahat/megaboilerplate/tree/master/examples/jekyll#mega-boilerplate-jekyll-blog-example" className="demo-container demo4" target="_blank">
                  <p><span><strong>Demo 4</strong> - Jekyll blo</span>g</p>
                  <span className="text-normal">Ruby - Jekyll</span>
                </a>
                <a href="https://github.com/sahat/megaboilerplate/tree/master/examples/middleman#mega-boilerplate-middleman-site-example" className="demo-container demo5" target="_blank">
                  <p><span><strong>Demo 5</strong> - Middleman static site</span></p>
                  <span className="text-normal">Ruby - Middleman</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
