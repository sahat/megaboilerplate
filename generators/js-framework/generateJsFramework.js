import generateJsFrameworkNone from './generateJsFrameworkNone';
import generateJsFrameworkReact from './generateJsFrameworkReact';

async function generateJsFramework(params) {
  switch (params.jsFramework) {
    case 'react':
      await generateJsFrameworkReact(params);
      break;
    case 'angular':
      // TODO
      break;
    case 'none':
      await generateJsFrameworkNone(params);
      break;
    default:
      // TODO
  }
}

export default generateJsFramework;
