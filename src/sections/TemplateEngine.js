import React from 'react';
import cx from 'classnames';

const TEMPLATE_ENGINE_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 32 32">
    <path style="text-indent:0;text-align:start;line-height:normal;text-transform:none;block-progression:tb;-inkscape-font-specification:Bitstream Vera Sans" d="M 5 6 L 5 7 L 5 14 L 4 14 L 4 18 L 5 18 L 5 25 L 5 26 L 6 26 L 26 26 L 27 26 L 27 25 L 27 18 L 28 18 L 28 14 L 27 14 L 27 7 L 27 6 L 26 6 L 6 6 L 5 6 z M 7 8 L 25 8 L 25 14 L 24 14 L 24 18 L 25 18 L 25 24 L 7 24 L 7 18 L 8 18 L 8 14 L 7 14 L 7 8 z M 12 11 L 12 13 L 15 13 L 15 21 L 17 21 L 17 13 L 20 13 L 20 11 L 12 11 z" color="#000" overflow="visible" font-family="Bitstream Vera Sans"></path>
  </svg>
);

const TemplateEngine = (props) => {
  let nodeTemplateEngines = (props.platform === 'node') ? (
    <div>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/jade-logo.svg" height="60" alt="Jade"/>
        <input type="radio" name="templateEngineRadios" value="jade" onChange={props.handleChange} checked={props.templateEngine === 'jade'}/> Jade
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/handlebars-logo.svg" alt="Handlebars"/>
        <input type="radio" name="templateEngineRadios" value="handlebars" onChange={props.handleChange} checked={props.templateEngine === 'handlebars'}/> Handlebars
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/nunjucks-logo.png" alt="Nunjucks"/>
        <input type="radio" name="templateEngineRadios" value="nunjucks" onChange={props.handleChange} checked={props.templateEngine === 'nunjucks'}/> Nunjucks
      </label>
      <label className="radio-inline">
        <img className="btn-logo" src="/img/svg/none.png" alt="None"/>
        <input type="radio" name="templateEngineRadios" value="none" onChange={props.handleChange} checked={props.templateEngine === 'none'}/> None
      </label>

      <ul className="nav nav-stacked">
        <li>
          <a data-toggle="collapse" href="#templateEngineCollapse1">
            <i className="ion-help-circled"/> What's a template engine?
          </a>
          <div id="templateEngineCollapse1" className="collapse">
            <div className="panel-collapse">
              Lorem ipsum
            </div>
          </div>
        </li>
        <li>
          <a data-toggle="collapse" href="#templateEngineCollapse2">
            <i className="ion-help-circled"/> When should I use a template engine?
          </a>
          <div id="templateEngineCollapse2" className="collapse">
            <div className="panel-collapse">
              Select <strong>None</strong> if you are building an API server or a single-page application.
            </div>
          </div>
        </li>
        <li>
          <a data-toggle="collapse" href="#templateEngineCollapse3">
            <i className="ion-help-circled"/> Jade vs Handlebars vs Nunjucks?
          </a>
          <div id="templateEngineCollapse3" className="panel-collapse collapse">
            Lorem ipsum
          </div>
        </li>
      </ul>
    </div>
  ) : null;

  return (
    <section className={cx('animated fadeIn', props.templateEngine)}>
      <h6>{TEMPLATE_ENGINE_SVG} {!props.templateEngine || props.templateEngine === 'none' ? 'Template Engine' : props.templateEngine}</h6>
      {nodeTemplateEngines}
    </section>
  )
};

export default TemplateEngine;
