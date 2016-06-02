import React from 'react';

class Demos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="text-center"><strong>Mega</strong> Boilerplate Demos</h1>
        <br/>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <img src="img/demo1.png" width="100%" alt="Demo 1 Screenshot"/>
              <div className="panel-body">
                <p>Express - Jade - <strong>Bootstrap Sass</strong> - <strong>No JS Framework</strong> - Mocha - MongoDB - All Auth Choices</p>
                <a href="#" role="button" className="btn btn-primary">View Demo 1</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <img src="img/demo2.png" width="100%" alt="Demo 2 Screenshot"/>
              <div className="panel-body">
                <p>Express - Handlebars - <strong>Foundation CSS</strong> - <strong>AngularJS</strong> - Gulp - MongoDB - Facebook & Google Auth</p>
                <a href="#" role="button" className="btn btn-primary">View Demo 2</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <img src="img/demo3.png" width="100%" alt="Demo 3 Screenshot"/>
              <div className="panel-body">
                <p>Express - Nunjucks - PostCSS / <strong>No CSS Framework</strong> - <strong>React + Redux</strong> - Webpack - Mocha - SQLite - Twitter Auth</p>
                <a href="#" role="button" className="btn btn-primary">View Demo 3</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <img src="img/demo4.png" width="100%" alt="Demo 4 Screenshot"/>
              <div className="panel-body">
                <p><strong>Jekyll Blog</strong></p>
                <a href="#" role="button" className="btn btn-primary">View Demo 4</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <img src="img/demo5.png" width="100%" alt="Demo 5 Screenshot"/>
              <div className="panel-body">
                <p><strong>Middleman Site</strong></p>
                <a href="#" role="button" className="btn btn-primary">View Demo 5</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Demos;
