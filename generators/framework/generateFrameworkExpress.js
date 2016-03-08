import { join } from 'path';
import { cpy, mkdirs, readJson, writeJson, replaceCode, addNpmScript, addNpmPackage } from '../utils';

async function generateFrameworkExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const express = join(__dirname, 'modules', 'express');
  const contactRoute = join(__dirname, 'modules', 'express', 'routes', 'contact.js');
  const contactController = join(__dirname, 'modules', 'express', 'controllers', 'contact.js');
  const contactControllerRequire = join(__dirname, 'modules', 'express', 'controllers', 'contact-require.js');

  // Copy initial Express files
  await cpy([
    join(express, 'app.js'),
    join(express, 'package.json'),
    join(express, '.env')
  ], build);

  // Update app name package.json
  const packageJson = join(build, 'package.json');
  const packageObj = await readJson(packageJson);
  packageObj.name = params.appName;
  await writeJson(packageJson, packageObj, { spaces: 2 });

  // Optional: Socket.IO
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(join(build, 'app.js'), 'SOCKETIO_REQUIRE', join(express, 'socketio-require.js'));
    await replaceCode(join(build, 'app.js'), 'SOCKETIO', join(express, 'socketio-init.js'));
    await addNpmPackage('socket.io', params);
  } else {
    await replaceCode(join(build, 'app.js'), 'APP_LISTEN', join(express, 'app-listen.js'));
  }

  // Optional: PM2
  if (params.frameworkOptions.includes('pm2')) {
    await addNpmPackage('pm2', params);
    await addNpmScript('start-production', 'pm2 start app.js -i 4', params);
  }

  // Create controllers dir
  await mkdirs(join(build, 'controllers'));

  // Add initial routes and controllers
  await cpy([contactController], join(build, 'controllers'));
  await replaceCode(join(build, 'app.js'), 'CONTACT_CONTROLLER', contactControllerRequire);
  await replaceCode(join(build, 'app.js'), 'CONTACT_ROUTE', contactRoute);

  // Create public dirs
  await mkdirs(join(build, 'public', 'img'));
  await mkdirs(join(build, 'public', 'css'));
  await mkdirs(join(build, 'public', 'js'));
}

export default generateFrameworkExpress;
