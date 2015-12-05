let path = require('path');
let removeCode = require('../../utils/removeCode');

async function cleanupCssFrameworkStrings(params) {
  switch (params.framework) {
    case 'express':
      if (params.templateEngine === 'jade') {
        let layout = path.join(__base, 'build', params.uuid, 'views', 'layout.jade');
        await removeCode(layout, 'CSS_FRAMEWORK_IMPORT');
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'swig') {
        // TODO
      } else {
        // TODO
      }
      break;
    case 'hapi':
      if (params.templateEngine === 'jade') {
        // TODO
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'swig') {
        // TODO
      } else {
        // TODO
      }
      break;
    case 'sails':
      if (params.templateEngine === 'jade') {
        // TODO
      } else if (params.templateEngine === 'handlebars') {
        // TODO
      } else if (params.templateEngine === 'swig') {
        // TODO
      } else {
        // TODO
      }
      break;
    default:
      // TODO
      break;
  }
}

module.exports = cleanupCssFrameworkStrings;
