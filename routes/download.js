import generateFramework from '../generators/framework/generateFramework';
import generateTemplateEngine from '../generators/template-engine/generateTemplateEngine';
import generateCssFramework from '../generators/css-framework/generateCssFramework';
import generateCssPreprocessor from '../generators/css-preprocessor/generateCssPreprocessor';
import generateBuildTool from '../generators/build-tool/generateBuildTool';
import generateTesting from '../generators/testing/generateTesting';
import generateJsFramework from '../generators/js-framework/generateJsFramework';
import generateDatabase from '../generators/database/generateDatabase';
import generateAuthentication from '../generators/authentication/generateAuthentication';
import { walkAndRemoveComments, prepare, cleanup } from '../generators/utils';

async function download(req, res) {
  let params = await prepare(req.body);
  try {
    await generateFramework(params);
    await generateTemplateEngine(params);
    await generateCssFramework(params);
    await generateCssPreprocessor(params);
    await generateJsFramework(params);
    await generateBuildTool(params);
    await generateTesting(params);
    await generateDatabase(params);
    await generateAuthentication(params);
    await walkAndRemoveComments(params);
    res.end();
  } catch (err) {
    console.info(err.stack);
    console.info(params);
    res.status(500).send(err.message);
  }

}

export default download;
