import React from 'react';

class InlineSvg extends React.Component {
  render() {
    let svg = require(`raw!../assets/img/svg/${this.props.name}.svg`);

    let styles = {
      display: 'inline-block',
      width: this.props.width,
      verticalAlign: 'middle',
      lineHeight: 'initial'
    };
    return <div style={styles} dangerouslySetInnerHTML={{__html: svg}} />;
  }
}

InlineSvg.defaultProps = {
  width: '28px'
};

export default InlineSvg;
