import React from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';

const CHECK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1"  width="18px" height="18px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" style={{ verticalAlign: 'bottom' }}>
    <path  d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.2 22 21.40625 18.1 21.90625 13 L 19.90625 13 C 19.40625 16.9 16 20 12 20 C 7.6 20 4 16.4 4 12 C 4 7.6 7.6 4 12 4 C 13.4 4 14.70625 4.4 15.90625 5 L 17.40625 3.5 C 15.80625 2.6 14 2 12 2 z M 20.5 4.875 L 11.1875 13.78125 L 7.5 10.09375 L 6.09375 11.5 L 10.5 15.90625 L 11.1875 16.59375 L 11.90625 15.90625 L 21.90625 6.3125 L 20.5 4.875 z" color="#000" overflow="visible" enable-background="accumulate" font-family="Bitstream Vera Sans"></path>
  </svg>
);

const NextSteps = (props) => {
  let description;

  switch (props.database) {
    case 'mongodb':
      description = (
        <div>
          <strong><a href="http://mongodb.org/" target="_blank">MongoDB</a></strong> — Document-oriented, general purpose NoSQL database.
        </div>
      );
      break;
    case 'sqlite':
      description = (
        <div>
          <strong><a href="https://www.sqlite.org/" target="_blank">SQLite</a></strong> — A self-contained, serverless, zero-configuration, transactional SQL database engine.
        </div>
      );
      break;
    case 'mysql':
      description = (
        <div>
          <strong><a href="http://www.mysql.com/" target="_blank">MySQL</a></strong> — The world's most popular open source database.
        </div>
      );
      break;
    case 'postgresql':
      description = (
        <div>
          <strong><a href="http://www.postgresql.org/" target="_blank">PostgreSQL </a></strong> — The world's most advanced open source database.
        </div>
      );
      break;
    default:
      description = <div className="placeholder"> </div>;
  }

  return (
    <div className="panel zoomInBackwards">
      <div className="panel-body">
        <VelocityComponent runOnMount animation="transition.fadeIn" duration={900} delay={700}>
          <h4 style={{ opacity: 0 }}>{CHECK_SVG} All Set!</h4>
        </VelocityComponent>
        <VelocityComponent runOnMount animation="transition.fadeIn" duration={900} delay={1100}>
          <p style={{ opacity: 0 }}>Your boilerplate project is now ready to be used.</p>
        </VelocityComponent>
        <div className="row">
          <VelocityComponent runOnMount animation="transition.slideUpIn" duration={900} delay={1500}>
            <div className="col-xs-4" style={{ opacity: 0 }}>
              <div className="text-center">
                <img className="next-steps-icon" src="/img/svg/rocket.svg" alt="Getting Started"/>
                <p>
                  See how to <a href="/introduction/build-tools.html">get started</a> with <strong>Express</strong> and <a href="#">setup</a> a <strong>MySQL</strong> database.
                </p>
              </div>
          </div>
          </VelocityComponent>
          <VelocityComponent runOnMount animation="transition.slideUpIn" duration={900} delay={1800}>
            <div className="col-xs-4 separator" style={{ opacity: 0 }}>
              <div className="text-center">
                <img className="next-steps-icon" src="/img/svg/learn.svg" alt="Learn"/>
                <p>
                  Learn more about <strong>React</strong> and <strong>Redux</strong> using these curated <a href="/usage/theming.html">free resources</a>.
                </p>
              </div>
            </div>
          </VelocityComponent>
          <VelocityComponent runOnMount animation="transition.slideUpIn" duration={900} delay={2100}>
            <div className="col-xs-4" style={{ opacity: 0 }}>
              <div className="text-center">
                <img className="next-steps-icon" src="/img/svg/faq.svg" alt="FAQ"/>
                <p>
                  See <a href="#">frequently asked questions</a> about <strong>React</strong>.
                </p>
              </div>
            </div>
          </VelocityComponent>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;
