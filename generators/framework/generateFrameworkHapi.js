import { join } from 'path';
import { copy, mkdirs, readJson, writeJson } from '../utils';

async function generateFrameworkHapi(params) {
  let build = join(__base, 'build', params.uuid);
  let express = join(__base, 'modules', 'framework', 'express');

  // Copy initial Express files
  await copy(express, build);

  // Update package.json app name
  let packageJson = join(build, 'package.json');
  let packageObj = await readJson(packageJson);
  packageObj.name = params.appName;
  await writeJson(packageJson, packageObj, { spaces: 2 });

  // Create public dirs
  await mkdirs(join(build, 'public', 'images'));
  await mkdirs(join(build, 'public', 'javascripts'));
  await mkdirs(join(build, 'public', 'stylesheets'));
}

export default generateFrameworkHapi;