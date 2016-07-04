import generateFramework from './generators/framework/generateFramework';
import generateElectron from './generators/electron/generateElectron';
import generateJsLibrary from './generators/js-library/generateJsLibrary';
import generateStaticSite from './generators/static-site/generateStaticSite';
import generateTemplateEngine from './generators/template-engine/generateTemplateEngine';
import generateCssFramework from './generators/css-framework/generateCssFramework';
import generateBuildTool from './generators/build-tool/generateBuildTool';
import generateTesting from './generators/testing/generateTesting';
import generateJsFramework from './generators/js-framework/generateJsFramework';
import generateDatabase from './generators/database/generateDatabase';
import generateAuthentication from './generators/authentication/generateAuthentication';
import generateDeployment from './generators/deployment/generateDeployment';
import postprocessing from './generators/postprocessing';
import { walkAndRemoveCommentsMemory, createZipArchive } from './generators/utils';

export async function download(req, res) {
  const params = req.body;
  try {
    if (params.platform === 'library') {
      await generateJsLibrary(params);
    } else if (params.platform === 'html5') {
      await generateStaticSite(params);
    } else if (params.platform === 'electron') {
      await generateElectron(params);
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
    await createZipArchive(res, params);
  } catch (err) {
    console.info(err.stack);
    console.info(params);
    res.status(500).send({ message: err.message, stack: err.stack });
  }

}

