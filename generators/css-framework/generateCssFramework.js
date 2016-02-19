import generateBootstrap from './generateBootstrap';
import generateFoundation from './generateFoundation';
import generateBourbonNeat from './generateBourbonNeat';
import generateCssFrameworkNone from './generateCssFrameworkNone';

async function generateCssFramework(params) {
  console.log(params.cssFramework);
  switch (params.cssFramework) {
    case 'bootstrap':
      await generateBootstrap(params);
      break;

    case 'foundation':
      await generateFoundation(params);
      break;

    case 'bourbonNeat':
      await generateBourbonNeat(params);
      break;

    case 'none':
      await generateCssFrameworkNone(params);
      break;

    default:
      break;
  }
}

export default generateCssFramework;
