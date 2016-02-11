import { join } from 'path';
import { cpy, mkdirs, readJson, writeJson, replaceCode } from '../utils';

async function generateFrameworkExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const express = join(__base, 'modules', 'framework', 'express');

  // Copy initial Express files
  await cpy([
    join(express, 'app.js'),
    join(express, 'package.json')
  ], build);

  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(join(build, 'app.js'), 'SOCKETIO', join(express, 'socketio-init.js'));
  } else {
    await replaceCode(join(build, 'app.js'), 'APP_LISTEN', join(express, 'app-listen.js'));
  }

  // Update app name package.json
  const packageJson = join(build, 'package.json');
  const packageObj = await readJson(packageJson);
  packageObj.name = params.appName;
  await writeJson(packageJson, packageObj, { spaces: 2 });

  // Create public dirs
  await mkdirs(join(build, 'public', 'img'));
  await mkdirs(join(build, 'public', 'css'));
  await mkdirs(join(build, 'public', 'js'));
}

export default generateFrameworkExpress;
