let generateBootstrapCss = require('./generateBootstrapCss');
let generateCssFrameworkNone = require('./generateCssFrameworkNone');

async function generateCssFramework(params) {
  console.log(params);
  if (params.cssFramework === 'bootstrap' && params.cssFrameworkOptions === 'css') {
    await generateBootstrapCss(params);
  } else if (params.cssFramework === 'bootstrap' && params.cssFrameworkOptions === 'less') {
    // TODO
  } else if (params.cssFramework === 'bootstrap' && params.cssFrameworkOptions === 'sass') {
    // TODO
  } else if (params.cssFramework === 'foundation' && params.cssFrameworkOptions === 'css') {
    // TODO
  } else if (params.cssFramework === 'foundation' && params.cssFrameworkOptions === 'sass') {
    // TODO
  } else if (params.cssFramework === 'bourbonNeat' && params.cssFrameworkOptions === 'css') {
    // TODO
  } else if (params.cssFramework === 'bourbonNeat' && params.cssFrameworkOptions === 'sass') {
    // TODO
  } else if (params.cssFramework === 'none') {
    // TODO
  }
}

module.exports = generateCssFramework;
