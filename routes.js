let prepare = require('./utils/prepare');
let generateFramework = require('./generators/framework');
let generateTemplateEngine = require('./generators/template-engine');

exports.download = async function(req, res) {
  let params = await prepare(req.body);

  await generateFramework(params);
  await generateTemplateEngine(params);
  //await generateCssFramework;
  //await generateCssPreprocessor;
  //await generateDatabase;
  //await generateAuthentication;
  res.end();
};
