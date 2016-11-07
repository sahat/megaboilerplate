import React from 'react';
import cx from 'classnames';

const AUTHENTICATION_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 26 26">
    <path d="M 17.53125 1 C 15.73325 1 14.16375 1.9275 13.46875 3.6875 C 14.92775 4.8925 15.9375 6.75525 15.9375 9.28125 C 15.9375 11.97825 14.66575 14.44325 13.34375 16.03125 C 15.44975 16.82825 18.7455 18.425 19.6875 20.875 C 23.0055 20.691 25.96875 20.023 25.96875 18.125 L 25.96875 17.5 C 25.96775 15.76 22.934 14.05725 20.25 13.15625 C 20.128 13.11525 19.36075 12.9305 19.84375 11.4375 C 21.10375 10.1215 21.96875 7.99125 21.96875 5.90625 C 21.96875 2.69725 19.97325 1 17.53125 1 z M 8.96875 4.09375 C 6.36875 4.09375 4.125 5.86925 4.125 9.28125 C 4.125 11.51025 5.18425 13.7875 6.53125 15.1875 C 7.05625 16.5855 6.10325 17.58225 5.90625 17.65625 C 3.18625 18.65425 5.9211895e-16 20.453 0 22.25 L 0 22.9375 C 0 25.3865 4.671 25.9375 9 25.9375 C 13.334 25.9375 17.96875 25.3865 17.96875 22.9375 L 17.96875 22.25 C 17.96875 20.398 14.76125 18.61525 11.90625 17.65625 C 11.77525 17.61325 10.95475 16.74325 11.46875 15.15625 L 11.4375 15.15625 C 12.7775 13.75525 13.9375 11.50225 13.9375 9.28125 C 13.9375 5.86925 11.56675 4.09375 8.96875 4.09375 z"></path>
  </svg>
);

class Authentication extends React.Component {
  render() {
    const props = this.props;
    
    const notSupportedNoDatabase = props.database === 'none' ? (
      <div>
        <strong>Note: </strong> To enable authentication you must select a database.
      </div>
    ) : null;

    const isEmailRequired = props.authentication && (
        props.authentication.has('facebook') ||
        props.authentication.has('google') ||
        props.authentication.has('twitter') ||
        props.authentication.has('vk') ||
        props.authentication.has('github')
      );

    let authenticationCheckboxes = !notSupportedNoDatabase ? (
      <div className="radio-group">
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/none.png" alt="None" />
          <input type="checkbox" name="authenticationCheckboxes" value="none" onChange={props.handleChange} checked={props.authentication && props.authentication.size === 0}  />
          <span>None</span>
        </label>
        <label className={cx('checkbox-inline', { 'locked': isEmailRequired })}>
          <img className="btn-logo" src="/img/svg/email-logo.svg" height="60" alt="Email" />
          <input type="checkbox" name="authenticationCheckboxes" value="email" onChange={props.handleChange} checked={props.authentication && props.authentication.has('email') || isEmailRequired} />
          <span>Email</span>
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/facebook-logo.svg" alt="Facebook" />
          <input type="checkbox" name="authenticationCheckboxes" value="facebook" onChange={props.handleChange} checked={props.authentication && props.authentication.has('facebook')}  />
          <span>Facebook</span>
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/google-logo.svg" alt="Google" />
          <input type="checkbox" name="authenticationCheckboxes" value="google" onChange={props.handleChange} checked={props.authentication && props.authentication.has('google')} />
          <span>Google</span>
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/twitter-logo.svg" alt="Twitter" />
          <input type="checkbox" name="authenticationCheckboxes" value="twitter" onChange={props.handleChange} checked={props.authentication && props.authentication.has('twitter')} />
          <span>Twitter</span>
        </label>
        <label className="checkbox-inline">
          <img className="btn-logo" src="/img/svg/github-logo2.svg" alt="Github" />
          <input type="checkbox" name="authenticationCheckboxes" value="github" onChange={props.handleChange} checked={props.authentication && props.authentication.has('github')} />
          <span>GitHub</span>
        </label>
        <label className="checkbox-inline" title="VKontakte (ВКонтакте)">
          <img className="btn-logo" src="/img/svg/vk-logo.svg" alt="VK" />
          <input type="checkbox" name="authenticationCheckboxes" value="vk" onChange={props.handleChange} checked={props.authentication && props.authentication.has('vk')} />
          <span>VK</span>
        </label>
      </div>
    ) : null;

    const validationError = props.authenticationValidationError ? (
      <div className="text-danger"><i className="fa fa-warning"></i> {props.authenticationValidationError}</div>
    ) : null;

    if (props.authenticationValidationError) {
      if (props.disableAutoScroll) {
        $(this.refs.authentication).velocity('scroll', { duration: 0 });
      } else {
        $(this.refs.authentication).velocity('scroll');
      }
    }

    return (
      <div ref="authentication" className={cx('zoomInBackwards panel', { authentication: props.authentication && props.authentication.size > 0 })}>
        <div className="panel-heading">
          <h6>{AUTHENTICATION_SVG}<span>Authentication</span></h6>
        </div>
        <div className="panel-body">
          {notSupportedNoDatabase}
          {authenticationCheckboxes}
          {validationError}
        </div>
      </div>
    );
  } 
}

export default Authentication;
