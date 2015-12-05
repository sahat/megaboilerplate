let generateFrameworkExpress = require('../../generators/framework/express');

async function generateFramework(params) {
  switch (params.framework) {
    case 'express':
      await generateFrameworkExpress(params);
      break;
    case 'hapi':
      break;
    case 'sails':
      break;
    default:
      break;
  }
}

module.exports = generateFramework;
