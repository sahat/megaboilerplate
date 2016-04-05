import { join } from 'path';
import { cpy, mkdirs, templateReplace, replaceCode, addNpmScript, addNpmPackage } from '../utils';

async function generateFrameworkExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const express = join(__dirname, 'modules', 'express');
  const contactRouteJwt = join(__dirname, 'modules', 'express', 'routes', 'contact-jwt.js');
  const contactRoutePassport = join(__dirname, 'modules', 'express', 'routes', 'contact-passport.js');
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
    join(express, 'server.js'),
    join(express, 'package.json'),
    join(express, '.env'),
    join(express, '.gitignore')
  ], build);
  
  const server = join(build, 'server.js');

  // Update app name package.json
  await templateReplace(join(build, 'package.json'), { name: params.appName });

  // Optional: Socket.IO
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(server, 'SOCKETIO_REQUIRE', join(express, 'socketio-require.js'));
    await replaceCode(server, 'SOCKETIO', join(express, 'socketio-init.js'));
    await addNpmPackage('socket.io', params);
  } else {
    await replaceCode(server, 'APP_LISTEN', join(express, 'app-listen.js'));
  }

  // Optional: PM2
  if (params.frameworkOptions.includes('pm2')) {
    await addNpmPackage('pm2', params);
    await addNpmScript('start-production', 'pm2 start server.js -i 4', params);
  }

  // Create controllers dir
  await mkdirs(join(build, 'controllers'));

  // Add initial routes and controllers
  await cpy([contactController], join(build, 'controllers'));
  await replaceCode(server, 'CONTACT_CONTROLLER', contactControllerRequire);

  const contactJs = join(build, 'controllers', 'contact.js');
  if (params.jsFramework) {
    await replaceCode(contactJs, 'CONTACT_VALIDATION_ERROR', join(__dirname, 'modules', 'express', 'responses', 'json', 'contact-validation-error.js'), { indentLevel: 2 });
    await replaceCode(contactJs, 'CONTACT_SUCCESS', join(__dirname, 'modules', 'express', 'responses', 'json', 'contact-success.js'), { indentLevel: 2 });
  } else {
    await replaceCode(contactJs, 'CONTACT_VALIDATION_ERROR', join(__dirname, 'modules', 'express', 'responses', 'session', 'contact-validation-error.js'), { indentLevel: 2 });
    await replaceCode(contactJs, 'CONTACT_SUCCESS', join(__dirname, 'modules', 'express', 'responses', 'session', 'contact-success.js'), { indentLevel: 2 });
  }

  if (params.jsFramework) {
    await replaceCode(server, 'CONTACT_ROUTE', contactRouteJwt);

    if (params.jsFramework === 'react') {
      await replaceCode(server, 'COOKIE_PARSER_REQUIRE', cookieParserRequire);
      await replaceCode(server, 'COOKIE_PARSER_MIDDLEWARE', cookieParserMiddleware);

      await addNpmPackage('cookie-parser', params);
    }
  } else {
    await replaceCode(server, 'CONTACT_ROUTE', contactRoutePassport);
    await replaceCode(server, 'METHOD_OVERRIDE_REQUIRE', methodOverrideRequire);
    await replaceCode(server, 'METHOD_OVERRIDE_MIDDLEWARE', methodOverrideMiddleware);
    await replaceCode(server, 'SESSION_REQUIRE', sessionRequire);
    await replaceCode(server, 'SESSION_MIDDLEWARE', sessionMiddleware);

    await addNpmPackage('express-session', params);
    await addNpmPackage('express-flash', params);
    await addNpmPackage('method-override', params);
  }
}

export default generateFrameworkExpress;
