import React from 'react';
import cx from 'classnames';

const FRAMEWORK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 26 26">
    <path d="M 25.15625 0.1875 C 23.885328 0.2454375 20.96425 0.5555 18.0625 2 C 16.8205 2.62 15.58275 3.4505 14.46875 4.5625 C 12.648519 6.3827313 10.066928 9.4736107 7.90625 12.125 L 3.6875 12.0625 C 3.5455 12.0325 3.36325 12.0865 3.28125 12.1875 L 0.90625 15.21875 C 0.82525 15.31675 0.88925 15.43775 1.03125 15.46875 L 4.65625 16.25 C 4.651574 16.342561 4.691676 16.488906 4.78125 16.75 L 4.09375 18.25 C 4.09375 18.25 3.80625 18.74475 5.53125 20.46875 C 7.25525 22.19275 7.75 21.90625 7.75 21.90625 L 9.28125 21.21875 C 9.5673018 21.312365 9.7068625 21.321578 9.78125 21.3125 L 10.5625 25 C 10.5895 25.141 10.7145 25.207 10.8125 25.125 L 13.84375 22.75 C 13.94475 22.67 13.99975 22.48575 13.96875 22.34375 L 13.90625 18.03125 C 16.571535 15.855539 19.672077 13.296113 21.4375 11.53125 C 22.5455 10.42125 23.38 9.1815 24 7.9375 C 25.919 4.0755 25.8125 0.1875 25.8125 0.1875 C 25.8125 0.1875 25.579891 0.1681875 25.15625 0.1875 z M 18 5.9375 C 19.131 5.9375 20.0625 6.869 20.0625 8 C 20.0625 9.131 19.131 10.0625 18 10.0625 C 16.869 10.0625 15.9375 9.131 15.9375 8 C 15.9375 6.869 16.869 5.9375 18 5.9375 z M 2.84375 18.8125 C 2.60375 19.0145 2.357 19.2055 2.125 19.4375 C -0.204 21.7675 0.125 25.875 0.125 25.875 C 0.125 25.875 4.2335 26.205 6.5625 23.875 C 6.7935 23.644 6.9865 23.39525 7.1875 23.15625 C 7.0475 23.08225 6.89075 22.989 6.71875 22.875 C 4.75875 24.378 1.84375 24.15625 1.84375 24.15625 C 1.84375 24.15625 1.622 21.23925 3.125 19.28125 C 3.01 19.10825 2.91775 18.9535 2.84375 18.8125 z"></path>
  </svg>
);

class Framework extends React.Component {
  constructor(props) {
    super(props);
    this.initializeTooltip.bind(this);
  }

  initializeTooltip() {
    let clusterTooltip = this.refs.clusterTooltip;
    let socketioTooltip = this.refs.socketioTooltip;

    if (this.props.framework) {
      $(clusterTooltip).tooltip({
        title: 'A single instance of Node.js runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node.js processes to handle the load.The cluster module allows you to easily create child processes that all share server ports.'
      });
      $(socketioTooltip).tooltip({
        title: 'Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.'
      });
    } else {
      // Hides and destroys an element's tooltip.
      $(clusterTooltip).tooltip('destroy');
      $(socketioTooltip).tooltip('destroy');
    }
  }

  componentDidMount() {
    this.initializeTooltip();
  }

  componentDidUpdate() {
    this.initializeTooltip();
  }

  render() {
    let props = this.props;

    let optionsClasses = cx("nav nav-stacked", {
      fadeIn: props.framework,
      animated: props.framework,
      invisible: !props.framework
    });

    let nodeFrameworks = (props.platform === 'node') ? (
      <div>
        <label className="radio-inline">
          <span className="express-logo">Express</span>
          <input type="radio" id="expressRadio" name="frameworkRadios" value="express" onChange={props.handleChange} checked={props.framework === 'express'}/>
          <span>Express</span>
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/hapi-logo.png" alt="Hapi.js"/>
          <input type="radio" name="frameworkRadios" value="hapi" onChange={props.handleChange} checked={props.framework === 'hapi'}/>
          <span>Hapi</span>
        </label>
        <label className="radio-inline">
          <img className="btn-logo" src="/img/svg/meteor-logo.png" alt="Meteor"/>
          <input type="radio" name="frameworkRadios" value="meteor" onChange={props.handleChange} checked={props.framework === 'meteor'}/>
          <span>Meteor</span>
        </label>

        <ul className={optionsClasses}>
          <li>
            <a data-toggle="collapse" href="#frameworkCollapse1">
              <img className="options-icon animated" src="/img/svg/options.svg"/>
              Additional Options
            </a>
            <div id="frameworkCollapse1" className="collapse">
              <div className="panel-collapse">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="cluster" />
                    <span ref="clusterTooltip" data-toggle="tooltip" data-placement="top">Node.js Cluster</span>
                  </label>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="socketio" />
                    <span ref="socketioTooltip" data-toggle="tooltip" data-placement="top">Socket.IO</span>
                  </label>
                </div>
              </div>
            </div>
          </li>
        </ul>

      </div>
    ) : null;

    return (
      <div className={cx('animated fadeIn panel', props.framework)}>
        <div className="panel-heading">
          <h6>{FRAMEWORK_SVG} {props.framework || 'Framework'}</h6>
        </div>
        <div className="panel-body">
          {nodeFrameworks}
        </div>
      </div>
    );
  }
};

export default Framework;
