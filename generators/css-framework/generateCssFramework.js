let generateBootstrapCss = require('./generateBootstrapCss');
let generateCssFrameworkNone = require('./generateCssFrameworkNone');

async function generateCssFramework(params) {
  switch (params.cssFramework) {
    case 'bootstrapCss':
      await generateBootstrapCss(params);
      break;
    case 'bootstrapLess':
      // TODO
      break;
    case 'bootstrapSass':
      // TODO
      break;
    case 'foundationCss':
      // TODO
      break;
    case 'foundationSass':
      // TODO
      break;
    case 'bourbonNeat':
      // TODO
      break;
    case 'none':
      await generateCssFrameworkNone(params);
      break;
    default:
      // TODO
  }
}

module.exports = generateCssFramework;
