import generateCssFrameworkBootstrap from './generateCssFrameworkBootstrap';
import generateCssFrameworkFoundation from './generateCssFrameworkFoundation';
import generateCssFrameworkBourbonNeat from './generateCssFrameworkBourbonNeat';
import generateCssFrameworkNone from './generateCssFrameworkNone';

async function generateCssFramework(params) {
  switch (params.cssFramework) {
    case 'bootstrap':
      await generateCssFrameworkBootstrap(params);
      break;

    case 'foundation':
      await generateCssFrameworkFoundation(params);
      break;

    case 'bourbonNeat':
      // await generateCssFrameworkBourbonNeat(params);
      break;

    case 'none':
      await generateCssFrameworkNone(params);
      break;

    default:
      break;
  }
}

export default generateCssFramework;
