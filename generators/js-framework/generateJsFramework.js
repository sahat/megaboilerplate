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
    default:
      await generateJsFrameworkNone(params);
  }
}

export default generateJsFramework;
