let generateJsFrameworkJquery = require('./generateJsFrameworkJquery');
let generateJsFrameworkNone = require('./generateJsFrameworkNone');
async function generateJsFramework(params) {
  switch (params.jsFramework) {
    case 'react':
      // TODO
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
