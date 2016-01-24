import React from 'react';
import cx from 'classnames';

const TEMPLATE_ENGINE_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: "middle", marginTop: '-1px'}} width="24px" height="24px" viewBox="0 0 32 32">
    <path d="M 5 6 L 5 7 L 5 14 L 4 14 L 4 18 L 5 18 L 5 25 L 5 26 L 6 26 L 26 26 L 27 26 L 27 25 L 27 18 L 28 18 L 28 14 L 27 14 L 27 7 L 27 6 L 26 6 L 6 6 L 5 6 z M 7 8 L 25 8 L 25 14 L 24 14 L 24 18 L 25 18 L 25 24 L 7 24 L 7 18 L 8 18 L 8 14 L 7 14 L 7 8 z M 12 11 L 12 13 L 15 13 L 15 21 L 17 21 L 17 13 L 20 13 L 20 11 L 12 11 z" color="#000" overflow="visible"></path>
  </svg>
);

class TemplateEngine extends React.Component {
  render() {
    let props = this.props;

    let nodeTemplateEngines = (props.platform === 'node') ? (
      <div className="radio-group">
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
      </div>
    ) : null;

    let description;

    switch (props.templateEngine) {
      case 'jade':
        description = (
          <div>
            <strong><a href="http://jade-lang.com/" target="_blank">Jade</a></strong> — High-performance template engine heavily influenced by <a href="http://haml.info/" target="_blank">Haml</a>.
          </div>
        );
        break;
      case 'handlebars':
        description = (
          <div>
            <strong><a href="http://handlebarsjs.com/" target="_blank">Handlebars</a></strong> — A superset of <a href="http://mustache.github.io/" target="_blank">Mustache</a> templates which adds powerful features like helpers and more advanced blocks.
          </div>
        );
        break;
      case 'nunjucks':
        description = (
          <div>
            <strong><a href="http://mozilla.github.io/nunjucks/" target="_blank">Nunjucks</a></strong> — A powerful templating engine with inheritance, asynchronous control, and more. It is heavily inspired by <a href="http://jinja.pocoo.org/docs/dev/" target="_blank">Jinja2</a>.
          </div>
        );
        break;
      default:
        description = <div className="placeholder"> </div>;
    }

    return (
      <div className={cx('animated fadeIn panel', props.templateEngine)}>
        <div className="panel-heading">
          <h6>{TEMPLATE_ENGINE_SVG} {!props.templateEngine || props.templateEngine === 'none' ? 'Template Engine' : props.templateEngine}</h6>
        </div>
        <div className="panel-body">
          {description}
          {nodeTemplateEngines}
        </div>
      </div>
    )
  }
}

export default TemplateEngine;
