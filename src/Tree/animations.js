export default {
  toggle: (props) => {
    return {
      animation: { rotateZ: props.node.toggled ? 90 : 0 },
      duration: 300
    };
  },
  drawer: (/* props */) => {
    return {
      enter: {
        animation: 'slideDown',
        duration: 300
      },
      leave: {
        animation: 'slideUp',
        duration: 300
      }
    };
  }
};
