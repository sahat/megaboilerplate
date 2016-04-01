import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class Modal extends React.Component {
  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  }

  render() {
    const { modalCategory } = this.props;
    let title;
    let body;

    switch (modalCategory) {
      case 'platform':
        title = 'Platform Stats';
        break;
    }

    const lastUpdated = moment().format();

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <table className="ui very basic  celled table">
                <thead>
                <tr>
                  <th>Choice</th>
                  <th>Downloads</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <h4 className="ui image header">
                      <img src="/img/svg/node-logo.svg" className="ui mini rounded image" />
                        <div className="content">
                          Node.js
                          <div className="sub header">Platform</div>
                        </div>
                    </h4>
                  </td>
                  <td>22</td>
                </tr>
                <tr>
                  <td>
                    <h4 className="ui image header">
                      <img src="/img/svg/html5-logo.svg" className="ui mini rounded image" />
                        <div className="content">
                          Static Site
                          <div className="sub header">Platform</div>
                        </div>
                    </h4>
                  </td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>
                    <h4 className="ui image header">
                      <img src="/img/svg/eslint-logo.svg" className="ui mini rounded image" />
                        <div className="content">
                          JS Library
                          <div className="sub header">Platform</div>
                        </div>
                    </h4>
                  </td>
                  <td>12</td>
                </tr>
                </tbody>
              </table>

              <p>Last updated: <strong>{lastUpdated}</strong></p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
