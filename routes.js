import { prepare } from './generators/utils';

import generateFramework from './generators/framework/generateFramework';
import generateTemplateEngine from './generators/template-engine/generateTemplateEngine';
import generateCssFramework from './generators/css-framework/generateCssFramework';
import generateCssPreprocessor from './generators/css-preprocessor/generateCssPreprocessor';
import generateCssBuildOptions from './generators/css-build-options/generateCssBuildOptions';
import generateDatabase from './generators/database/generateDatabase';
import generateAuthentication from './generators/authentication/generateAuthentication';
import generateJsFramework from './generators/js-framework/generateJsFramework';
import { walkAndRemoveComments, cleanup } from './generators/utils';

export async function download(req, res) {
  let params = await prepare(req.body);
  try {
    await generateFramework(params);
    await generateTemplateEngine(params);
    await generateCssFramework(params);
    await generateCssPreprocessor(params);
    await generateCssBuildOptions(params);
    await generateDatabase(params);
    await generateAuthentication(params);
    await generateJsFramework(params);
    await walkAndRemoveComments(params);
  } catch (e) {
    throw Error(e);
  }
  res.end();
}