import React from 'react';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';

const CHECK_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1" width="18px" height="18px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" style={{ verticalAlign: 'bottom' }}>
    <path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.2 22 21.40625 18.1 21.90625 13 L 19.90625 13 C 19.40625 16.9 16 20 12 20 C 7.6 20 4 16.4 4 12 C 4 7.6 7.6 4 12 4 C 13.4 4 14.70625 4.4 15.90625 5 L 17.40625 3.5 C 15.80625 2.6 14 2 12 2 z M 20.5 4.875 L 11.1875 13.78125 L 7.5 10.09375 L 6.09375 11.5 L 10.5 15.90625 L 11.1875 16.59375 L 11.90625 15.90625 L 21.90625 6.3125 L 20.5 4.875 z" color="#000" overflow="visible" enable-background="accumulate"></path>
  </svg>
);

const NextSteps = (props) => {
  let nameMap = {
    express: 'Express',
    meteor: 'Meteor',
    jekyll: 'Jekyll',
    middleman: 'Middleman',
    library: 'JavaScript Library',
    mongodb: 'MongoDB',
    mysql: 'MySQL',
    postgresql: 'PostgreSQL',
    sqlite: 'SQLite',
    heroku: 'Heroku',
    azure: 'Microsoft Azure',
    digitalOcean: 'Digital Ocean'
  };

  let urlMap = {
    express: 'express',
    meteor: 'meteor',
    jekyll: 'jekyll',
    middleman: 'middleman',
    library: 'js-library',
    mongodb: 'mongodb',
    mysql: 'mysql',
    postgresql: 'postgresql',
    sqlite: 'sqlite'
  };

  let gettingStartedText = `See how to <a href="https://github.com/sahat/megaboilerplate#${urlMap[props.framework || props.staticSiteGenerator || props.platform]}" target="_blank">get started</a> with <strong>${nameMap[props.framework || props.staticSiteGenerator || props.platform]}</strong>`;

  if (props.database && props.database !== 'none') {
    gettingStartedText += ` and <a href="https://github.com/sahat/megaboilerplate#${urlMap[props.database]}" target="_blank">setup</a> <strong>${nameMap[props.database]}</strong> database.`
  } else {
    gettingStartedText += `.`;
  }

  if (props.deployment && props.deployment !== 'none') {
    gettingStartedText += ` When ready to deploy, see <a href="https://github.com/sahat/megaboilerplate#deployment" target="_blank"> ${nameMap[props.deployment]} deployment guide</a>.`
  }

  const learnMap = {
    express: `<strong>Express</strong>`,
    meteor: `<strong>Meteor</strong>`,
    jekyll: `<strong>Jekyll</strong>`,
    middleman: `<strong>Middleman</strong>`,
    library: `creating a <strong>JavaScript Library</strong> and best practices`,
    react: `<strong>React</strong> and <strong>Redux</strong>`,
    angular: `<strong>Angular 2</strong> and <strong>TypeScript</strong>`,
    mysql: `<strong>Bookshelf.js ORM</strong>`,
    sqlite: `<strong>Bookshelf.js ORM</strong>`,
    postgresql: `<strong>Bookshelf.js ORM</strong>`,
    mongodb: `<strong>Mongoose</strong>`
  };

  const jsFramework = props.jsFramework && props.jsFramework !== 'none' ? props.jsFramework : null;
  const database = props.database  && props.database !== 'none' ? `${learnMap[props.framework]} and ${learnMap[props.database]}` : null;

  let learningText = `Learn more about ${learnMap[jsFramework] || database || learnMap[props.framework || props.staticSiteGenerator || props.platform]} using these curated <a href="https://github.com/sahat/megaboilerplate#learning-resources" target="_blank">free resources</a>.`;


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
                <p dangerouslySetInnerHTML={{ __html: gettingStartedText }}/>
              </div>
            </div>
          </VelocityComponent>
          <VelocityComponent runOnMount animation="transition.slideUpIn" duration={900} delay={1800}>
            <div className="col-xs-4 separator" style={{ opacity: 0 }}>
              <div className="text-center">
                <img className="next-steps-icon" src="/img/svg/learn.svg" alt="Learn"/>
                <p dangerouslySetInnerHTML={{ __html: learningText }}/>
              </div>
            </div>
          </VelocityComponent>
          <VelocityComponent runOnMount animation="transition.slideUpIn" duration={900} delay={2100}>
            <div className="col-xs-4" style={{ opacity: 0 }}>
              <div className="text-center">
                <img className="next-steps-icon" src="/img/svg/faq.svg" alt="FAQ"/>
                <p>
                  See <a href="https://github.com/sahat/megaboilerplate#faq" target="_blank">FAQ</a> before <a href="https://github.com/sahat/megaboilerplate/issues/new" target="_blank">opening an issue</a> on GitHub. For general questions, please visit the <a href="https://gitter.im/sahat/megaboilerplate" target="_blank">official Gitter chat</a>.
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
