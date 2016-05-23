import generateFramework from '../generators/framework/generateFramework';
import generateJsLibrary from '../generators/js-library/generateJsLibrary';
import generateStaticSite from '../generators/static-site/generateStaticSite';
import generateTemplateEngine from '../generators/template-engine/generateTemplateEngine';
import generateCssFramework from '../generators/css-framework/generateCssFramework';
import generateBuildTool from '../generators/build-tool/generateBuildTool';
import generateTesting from '../generators/testing/generateTesting';
import generateJsFramework from '../generators/js-framework/generateJsFramework';
import generateDatabase from '../generators/database/generateDatabase';
import generateAuthentication from '../generators/authentication/generateAuthentication';
import generateDeployment from '../generators/deployment/generateDeployment';
import postprocessing from '../generators/postprocessing';
import { walkAndRemoveComments, walkAndRemoveCommentsMemory, prepare, cleanup, generateAndSendZip } from '../generators/utils';

async function download(req, res) {
  let params = await prepare(req.body);
  try {
    if (params.platform === 'library') {
      await generateJsLibrary(params);
    } else if (params.platform === 'html5') {
      await generateStaticSite(params);
    } else {
      await generateFramework(params);
      await generateTemplateEngine(params);
      await generateCssFramework(params);
      await generateJsFramework(params);
      await generateBuildTool(params);
      await generateTesting(params);
      await generateDatabase(params);
      await generateAuthentication(params);
      await generateDeployment(params);
      await postprocessing(params);
    }
    await walkAndRemoveCommentsMemory(params);
    await generateAndSendZip(res, params);
    // res.end();
  } catch (err) {
    console.info(err.stack);
    console.info(params);
    res.status(500).send(err.message);
  }

}

export default download;
