import { join } from 'path';
import { copy, mkdirs, templateReplace } from '../utils';

async function generateFrameworkHapi(params) {
  let build = join(__base, 'build', params.uuid);
  let hapi = join(__dirname, 'modules', 'hapi');

  // Copy initial Hapi files
  await copy(hapi, build);

  // Update app name package.json
  templateReplace(join(build, 'package.json'), { name: params.appName });

  // Create public dirs
  await mkdirs(join(build, 'public', 'img'));
  await mkdirs(join(build, 'public', 'css'));
  await mkdirs(join(build, 'public', 'js'));
}

export default generateFrameworkHapi;
