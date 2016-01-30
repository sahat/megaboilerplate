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

const AUTO_SCROLL_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
    <path d="M 39.90625 7.96875 A 1.0001 1.0001 0 0 0 39.78125 8 A 1.0001 1.0001 0 0 0 39 9 L 39 38.53125 L 31.8125 31.34375 A 1.0001 1.0001 0 0 0 31.09375 31.03125 A 1.0001 1.0001 0 0 0 30.40625 32.75 L 39.28125 41.65625 L 40 42.34375 L 40.71875 41.65625 L 49.59375 32.75 A 1.0001 1.0001 0 1 0 48.1875 31.34375 L 41 38.53125 L 41 9 A 1.0001 1.0001 0 0 0 39.90625 7.96875 z M 0.71875 8 A 1.0043849 1.0043849 0 0 0 1 10 L 26 10 A 1 1 0 0 0 26 8 L 1 8 A 0.9910991 0.9910991 0 0 0 0.90625 8 A 1.001098 1.001098 0 0 0 0.8125 8 A 1.0043849 1.0043849 0 0 0 0.71875 8 z M 0.71875 16 A 1.0043849 1.0043849 0 0 0 1 18 L 19 18 A 1 1 0 0 0 19 16 L 1 16 A 0.98959894 0.98959894 0 0 0 0.90625 16 A 1.001098 1.001098 0 0 0 0.8125 16 A 1.0043849 1.0043849 0 0 0 0.71875 16 z M 0.8125 24 A 1.001098 1.001098 0 0 0 1 26 L 15 26 A 1 1 0 0 0 15 24 L 1 24 A 1 1 0 0 0 0.90625 24 A 1.001098 1.001098 0 0 0 0.8125 24 z M 0.8125 32.03125 A 0.98359835 0.98359835 0 0 0 1 33.96875 L 11 33.96875 A 0.98359835 0.98359835 0 1 0 11 32.03125 L 1 32.03125 A 0.98359835 0.98359835 0 0 0 0.8125 32.03125 z M 0.8125 40.03125 A 0.97609761 0.97609761 0 0 0 1 41.96875 L 7 41.96875 A 0.97609761 0.97609761 0 1 0 7 40.03125 L 1 40.03125 A 0.97609761 0.97609761 0 0 0 0.8125 40.03125 z"></path>
  </svg>
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoScroll = this.handleAutoScroll.bind(this);
    this.clickDownload = this.clickDownload.bind(this);
  }

  componentDidMount() {
    // Get checkbox value from local storage
    try {
      const autoScroll = localStorage.getItem('autoScroll');
      this.setState({ autoScroll: autoScroll === 'true'})
    } catch(e) {
      // Local storage is not supported or disabled
    }
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
          state.cssPreprocessor = 'css';
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
        if (!state.deployment && state.autoScroll) {
          $(refs.deployment).velocity('scroll');
z        }
        state.deployment = value;
        break;

      default:
      // Handle default case
    }

    this.setState(state);
  }

  handleAutoScroll(event) {
    const isChecked = event.target.checked;

    this.setState({ autoScroll: !isChecked });

    // Persist changes in local storage
    try {
      // gotcha: boolean will be converted to string
      localStorage.setItem('autoScroll', !isChecked);
    } catch(e) {
      // Local storage is not supported or disabled
    }
  }

  render() {
    const state = this.state;

    const enterAnimation = { animation: 'transition.slideLeftIn' };
    const leaveAnimation = { animation: 'transition.bounceOut' };
    const duration = 600;

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
      </ul>
    );

    const platform = (
      <VelocityTransitionGroup runOnMount enter={enterAnimation} duration={600}>
        <Platform platform={state.platform} handleChange={this.handleChange}/>
      </VelocityTransitionGroup>
    );

    const framework = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.platform ? <Framework {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const templateEngine = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.framework ? <TemplateEngine {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const cssFramework = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.templateEngine ? <CssFramework {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const cssPreprocessor = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.cssFramework ? <CssPreprocessor {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const jsFramework = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.cssPreprocessor ? <JsFramework {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const buildTool = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.jsFramework ? <BuildTool {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const testing = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.buildTool ? <Testing {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const database = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.testing ? <Database {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const authentication = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {state.database ? <Authentication {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const deployment = (
      <VelocityTransitionGroup enter={enterAnimation} leave={leaveAnimation} duration={duration}>
        {(state.authentication || state.database === 'none') ? <Deployment {...state} handleChange={this.handleChange}/> : null}
      </VelocityTransitionGroup>
    );

    const download = state.deployment ? (
      <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and
        Download</button>
    ) : null;

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
      <div>
        <Header />
        <main className="container">
          <br/>
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
          <button ref="downloadBtn" className="btn btn-block btn-mega" onClick={this.clickDownload}>Compile and
            Download
          </button>
        </main>
        <Footer />
      </div>

    );
  }
}

export default Home;
