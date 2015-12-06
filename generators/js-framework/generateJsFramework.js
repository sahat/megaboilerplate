let generateJsFrameworkJquery = require('./generateJsFrameworkJquery');

async function generateJsFramework(params) {
  switch (params.jsFramework) {
    case 'jquery':
      await generateJsFrameworkJquery(params);
      break;
    case 'react':
      // TODO
      break;
    case 'angular':
      // TODO
      break;
    case 'none':
      // TODO
      break;
    default:
      // TODO
  }
}

module.exports = generateJsFramework;
