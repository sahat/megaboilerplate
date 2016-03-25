import { join } from 'path';
import { cpy, mkdirs, templateReplace, replaceCode, addNpmScript, addNpmPackage } from '../utils';

async function generateFrameworkExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const express = join(__dirname, 'modules', 'express');
  const contactRoute = join(__dirname, 'modules', 'express', 'routes', 'contact.js');
  const contactController = join(__dirname, 'modules', 'express', 'controllers', 'contact.js');
  const contactControllerRequire = join(__dirname, 'modules', 'express', 'controllers', 'contact-require.js');
  const sessionRequire = join(__dirname, 'modules', 'express', 'session-require.js');
  const sessionMiddleware = join(__dirname, 'modules', 'express', 'session-middleware.js');
  const cookieParserRequire = join(__dirname, 'modules', 'express', 'cookie-parser-require.js');
  const cookieParserMiddleware = join(__dirname, 'modules', 'express', 'cookie-parser-middleware.js');
  const methodOverrideRequire = join(__dirname, 'modules', 'express', 'method-override-require.js');
  const methodOverrideMiddleware = join(__dirname, 'modules', 'express', 'method-override-middleware.js');

  // Copy initial Express files
  await cpy([
    join(express, 'app.js'),
    join(express, 'package.json'),
    join(express, '.env')
  ], build);
  
  const app = join(build, 'app.js');

  // Update app name package.json
  templateReplace(join(build, 'package.json'), { name: params.appName });

  // Optional: Socket.IO
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(app, 'SOCKETIO_REQUIRE', join(express, 'socketio-require.js'));
    await replaceCode(app, 'SOCKETIO', join(express, 'socketio-init.js'));
    await addNpmPackage('socket.io', params);
  } else {
    await replaceCode(app, 'APP_LISTEN', join(express, 'app-listen.js'));
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
  await replaceCode(app, 'CONTACT_CONTROLLER', contactControllerRequire);
  await replaceCode(app, 'CONTACT_ROUTE', contactRoute);

  // Create public dirs
  await mkdirs(join(build, 'public', 'img'));
  await mkdirs(join(build, 'public', 'css'));
  await mkdirs(join(build, 'public', 'js'));

  if (params.jsFramework) {
    await replaceCode(app, 'COOKIE_PARSER_REQUIRE', cookieParserRequire);
    await replaceCode(app, 'COOKIE_PARSER_MIDDLEWARE', cookieParserMiddleware);
    await addNpmPackage('cookie-parser', params);
  } else {
    await replaceCode(app, 'METHOD_OVERRIDE_REQUIRE', methodOverrideRequire);
    await replaceCode(app, 'METHOD_OVERRIDE_MIDDLEWARE', methodOverrideMiddleware);
    await replaceCode(app, 'SESSION_REQUIRE', sessionRequire);
    await replaceCode(app, 'SESSION_MIDDLEWARE', sessionMiddleware);
    await addNpmPackage('express-session', params);
    await addNpmPackage('express-flash', params);
    await addNpmPackage('method-override', params);
  }
}

export default generateFrameworkExpress;
