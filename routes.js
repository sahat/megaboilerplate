const prepare = require('./utils/prepare');
const generateFramework = require('./generators/framework');

exports.download = async function(req, res) {
  let params = await prepare(req.body);

  await generateFramework(params);
  //await generateTemplateEngine;
  //await generateCssFramework;
  //await generateCssPreprocessor;
  //await generateDatabase;
  //await generateAuthentication;
};
