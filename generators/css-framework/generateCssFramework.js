import generateBootstrap from './generateBootstrap';
import generateCssFrameworkNone from './generateCssFrameworkNone';

async function generateCssFramework(params) {
  console.log(params.cssFramework);
  switch (params.cssFramework) {
    case 'bootstrap':
      await generateBootstrap(params);
      break;

    case 'foundation':
      break;

    case 'bourbonNeat':
      break;

    case 'none':
      await generateCssFrameworkNone(params);
      break;

    default:
      break;
  }
}

export default generateCssFramework;
