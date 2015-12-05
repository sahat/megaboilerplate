var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');

var mkdirs = Promise.promisify(fs.mkdirs);
var copy = Promise.promisify(fs.copy);
var readJson = Promise.promisify(fs.readJson);
var writeJson = Promise.promisify(fs.writeJson);

let replaceCode = require('../../../utils/replaceCode');

async function generateJadeTemplateEngine(params) {
  switch (params.framework) {
    case 'express':
      let root = path.dirname(require.main.filename);
      let jadeExpressFile = path.join(root, 'modules', 'template-engine', 'jade', 'jade-express.js');
      let appFile = path.join(root, 'build', params.uuid, 'app.js');

      await replaceCode(appFile, 'EXPRESS_TEMPLATE_ENGINE_CONFIG', jadeExpressFile, { leadingBlankLine: true });

      let src = path.join(root, 'modules', 'template-engine', 'jade', 'views');
      let dest = path.join(root, 'build', params.uuid, 'views');

      await copy(src, dest);
      break;
    case 'hapi':
      // TODO: not implemented
      break;
    case 'sails':
      // TODO: not implemented
      break;
    default:
      return Promise.reject('Unsupported Framework');
  }
}

module.exports = generateJadeTemplateEngine;
