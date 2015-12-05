let prepare = require('./utils/prepare');
let generateFramework = require('./generators/framework/generateFramework');
let generateTemplateEngine = require('./generators/template-engine/generateTemplateEngine');
let generateCssFramework = require('./generators/css-framework/generateCssFramework');

async function download(req, res) {
  let params = await prepare(req.body);

  await generateFramework(params);
  await generateTemplateEngine(params);
  await generateCssFramework(params);
  //await generateCssPreprocessor;
  //await generateDatabase;
  //await generateAuthentication;
  res.end();
}

module.exports = {
  download: download
};
