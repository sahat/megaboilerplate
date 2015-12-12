let prepare = require('./utils/prepare');
let generateFramework = require('./generators/framework/generateFramework');
let generateTemplateEngine = require('./generators/template-engine/generateTemplateEngine');
let generateCssFramework = require('./generators/css-framework/generateCssFramework');
let generateCssPreprocessor = require('./generators/css-preprocessor/generateCssPreprocessor');
let generateCssBuildOptions = require('./generators/css-build-options/generateCssBuildOptions');
let generateDatabase = require('./generators/database/generateDatabase');
let generateAuthentication = require('./generators/authentication/generateAuthentication');
let generateJsFramework = require('./generators/js-framework/generateJsFramework');

async function download(req, res) {
  let params = await prepare(req.body);
try {
  await generateFramework(params);
  await generateTemplateEngine(params);
  await generateCssFramework(params);
  await generateCssPreprocessor(params);
  await generateCssBuildOptions(params);
  await generateDatabase(params);
  //await generateAuthentication(params);
  await generateJsFramework(params);
} catch (e) {
  throw Error(e);
}


  res.end();
}

module.exports = {
  download: download
};
