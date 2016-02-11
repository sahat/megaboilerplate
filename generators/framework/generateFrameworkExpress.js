import { join } from 'path';
import { cpy, mkdirs, readJson, writeJson, replaceCode, addNpmScript, addNpmPackage } from '../utils';

async function generateFrameworkExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const express = join(__base, 'modules', 'framework', 'express');

  // Copy initial Express files
  await cpy([
    join(express, 'app.js'),
    join(express, 'package.json')
  ], build);

  // Update app name package.json
  const packageJson = join(build, 'package.json');
  const packageObj = await readJson(packageJson);
  packageObj.name = params.appName;
  await writeJson(packageJson, packageObj, { spaces: 2 });

  // Socket.IO?
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(join(build, 'app.js'), 'SOCKETIO', join(express, 'socketio-init.js'));
    await addNpmPackage('socket.io', params);
  } else {
    await replaceCode(join(build, 'app.js'), 'APP_LISTEN', join(express, 'app-listen.js'));
  }

  // PM2?
  if (params.frameworkOptions.includes('pm2')) {
    await addNpmPackage('socket.io', params);
    await addNpmScript('start-production', 'pm2 start app.js -i 4', params);
  }

  // Create public dirs
  await mkdirs(join(build, 'public', 'img'));
  await mkdirs(join(build, 'public', 'css'));
  await mkdirs(join(build, 'public', 'js'));
}

export default generateFrameworkExpress;
