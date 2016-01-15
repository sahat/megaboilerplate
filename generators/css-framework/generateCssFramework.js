import generateBootstrap from './generateBootstrap';
import generateCssFrameworkNone from './generateCssFrameworkNone';

async function generateCssFramework(params) {
  if (params.cssFramework === 'bootstrap') {
    await generateBootstrap(params);
  } else if (params.cssFramework === 'foundation') {
  } else if (params.cssFramework === 'bourbonNeat') {
  } else if (params.cssFramework === 'none') {
  }
}

export default generateCssFramework;
