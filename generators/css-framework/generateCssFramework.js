import generateBootstrapCss from './generateBootstrapCss';
import generateBootstrapLess from './generateBootstrapLess';
import generateCssFrameworkNone from './generateCssFrameworkNone';

async function generateCssFramework(params) {
  if (params.cssFramework === 'bootstrap' && params.cssPreprocessor === 'css') {
    await generateBootstrapCss(params);
  } else if (params.cssFramework === 'bootstrap' && params.cssPreprocessor === 'less') {
    await generateBootstrapLess(params);
  } else if (params.cssFramework === 'bootstrap' && params.cssPreprocessor === 'sass') {
    // TODO
  } else if (params.cssFramework === 'foundation' && params.cssPreprocessor === 'css') {
    // TODO
  } else if (params.cssFramework === 'foundation' && params.cssPreprocessor === 'sass') {
    // TODO
  } else if (params.cssFramework === 'bourbonNeat' && params.cssPreprocessor === 'css') {
    // TODO
  } else if (params.cssFramework === 'bourbonNeat' && params.cssPreprocessor === 'sass') {
    // TODO
  } else if (params.cssFramework === 'none') {
    // TODO
  }
}

export default generateCssFramework;
