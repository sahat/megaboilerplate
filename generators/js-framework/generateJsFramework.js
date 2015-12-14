let generateJsFrameworkNone = require('./generateJsFrameworkNone');
let generateJsFrameworkReact = require('./generateJsFrameworkReact');

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

module.exports = generateJsFramework;
