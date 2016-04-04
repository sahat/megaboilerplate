import generateJsFrameworkNone from './generateJsFrameworkNone';
import generateJsFrameworkReact from './generateJsFrameworkReact';
import generateJsFrameworkAngularJs from './generateJsFrameworkAngularJs';

async function generateJsFramework(params) {
  switch (params.jsFramework) {
    case 'react':
      await generateJsFrameworkReact(params);
      break;
    case 'angularjs':
      await generateJsFrameworkAngularJs(params);
      break;
    case 'none':
      await generateJsFrameworkNone(params);
      break;
    default:
  }
}

export default generateJsFramework;
