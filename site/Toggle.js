import React from 'react'
import cx from 'classnames'

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    let checked = false;
    if ('checked' in props) {
      checked = props.checked;
    } else if ('defaultChecked' in props) {
      checked = props.defaultChecked;
    }
    this.state = {
      checked: !!checked,
      hasFocus: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: !!nextProps.checked })
    }
  }

  handleClick(event) {
    var checkbox = this.refs.input;
    if (event.target !== checkbox) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return
    }

    if (!('checked' in this.props)) {
      this.setState({ checked: checkbox.checked })
    }
  }

  handleFocus() {
    this.setState({ hasFocus: true });
  }

  handleBlur() {
    this.setState({ hasFocus: false });
  }

  render() {
    var classes = cx('react-toggle', {
      'react-toggle--checked': this.state.checked,
      'react-toggle--focus': this.state.hasFocus,
      'react-toggle--disabled': this.props.disabled
    });

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className="react-toggle-track">
          <div className="react-toggle-track-check">
            <Check />
          </div>
          <div className="react-toggle-track-x">
            <X />
          </div>
        </div>
        <div className="react-toggle-thumb"></div>

        <input
          ref="input"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="react-toggle-screenreader-only"
          type="checkbox"
          {...this.props} />
      </div>
    )
  }
}

Toggle.propTypes = {
  checked: React.PropTypes.bool,
  defaultChecked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  id: React.PropTypes.string
};

export default Toggle;
