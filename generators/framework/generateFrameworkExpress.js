import { randomBytes } from 'crypto';
import { getModule, addEnvMemory, templateReplaceMemory, replaceCodeMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';
import { set } from 'lodash';

async function generateFrameworkExpress(params) {
  params.build = {
    controllers: {
      'contact.js': await getModule('framework/express/controllers/contact.js')
    },
    '.env': await getModule('framework/express/.env'),
    '.gitignore': await getModule('framework/express/.gitignore'),
    'package.json': await getModule('framework/express/package.json'),
    'server.js': await getModule('framework/express/server.js')
  };

  // Add README.md
  set(params, ['build', 'README.md'], await getModule('readme/readme-nodejs.md'));
  templateReplaceMemory(params, 'README.md', {
    platform: params.platform,
    framework: params.framework,
    templateEngine: params.templateEngine,
    cssFramework: params.cssFramework,
    cssPreprocessor: params.cssPreprocessor,
    jsFramework: params.jsFramework,
    buildTool: params.buildTool,
    testing: params.testing,
    database: params.database,
    authentication: params.authentication,
    deployment: params.deployment
  });

  // Update app name in package.json
  templateReplaceMemory(params, 'package.json', { name: params.appName });

  // OPTIONAL: Socket.IO
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCodeMemory(params, 'server.js', 'SOCKETIO_REQUIRE', await getModule('framework/express/socketio-require.js'));
    await replaceCodeMemory(params, 'server.js', 'SOCKETIO', await getModule('framework/express/socketio-init.js'));
    await addNpmPackageMemory('socket.io', params);
  } else {
    await replaceCodeMemory(params, 'server.js', 'APP_LISTEN', await getModule('framework/express/app-listen.js'));
  }

  // OPTIONAL: PM2
  if (params.frameworkOptions.includes('pm2')) {
    await addNpmPackageMemory('pm2', params);
    await addNpmScriptMemory('start:production', 'pm2 start server.js -i 4', params);
  }

  // Require contract controller
  await replaceCodeMemory(params, 'server.js', 'CONTACT_CONTROLLER', await getModule('framework/express/controllers/contact-require.js'));

  if (params.jsFramework) {
    // Add contact route and cookie-parser middleware
    await replaceCodeMemory(params, 'server.js', 'CONTACT_ROUTE', await getModule('framework/express/routes/contact-jwt.js'));
    await replaceCodeMemory(params, 'server.js', 'COOKIE_PARSER_REQUIRE', await getModule('framework/express/cookie-parser-require.js'));
    await replaceCodeMemory(params, 'server.js', 'COOKIE_PARSER_MIDDLEWARE', await getModule('framework/express/cookie-parser-middleware.js'));

    await replaceCodeMemory(params, 'controllers/contact.js', 'CONTACT_VALIDATION_ERROR', await getModule('framework/express/responses/json/contact-validation-error.js'));
    await replaceCodeMemory(params, 'controllers/contact.js', 'CONTACT_SUCCESS', await getModule('framework/express/responses/json/contact-success.js'));

    await addNpmPackageMemory('cookie-parser', params);
    await addNpmPackageMemory('nodemailer', params);
  } else {
    // Add contact route, session middleware and method-override middleware
    await replaceCodeMemory(params, 'server.js', 'CONTACT_ROUTE', await getModule('framework/express/routes/contact-passport.js'));
    await replaceCodeMemory(params, 'server.js', 'METHOD_OVERRIDE_REQUIRE', await getModule('framework/express/method-override-require.js'));
    await replaceCodeMemory(params, 'server.js', 'METHOD_OVERRIDE_MIDDLEWARE', await getModule('framework/express/method-override-middleware.js'));
    await replaceCodeMemory(params, 'server.js', 'SESSION_REQUIRE', await getModule('framework/express/session-require.js'));
    await replaceCodeMemory(params, 'server.js', 'SESSION_MIDDLEWARE', await getModule('framework/express/session-middleware.js'));

    await replaceCodeMemory(params, 'controllers/contact.js', 'CONTACT_VALIDATION_ERROR', await getModule('framework/express/responses/session/contact-validation-error.js'));
    await replaceCodeMemory(params, 'controllers/contact.js', 'CONTACT_SUCCESS', await getModule('framework/express/responses/session/contact-success.js'));

    await addNpmPackageMemory('express-session', params);
    await addNpmPackageMemory('express-flash', params);
    await addNpmPackageMemory('method-override', params);
    await addNpmPackageMemory('nodemailer', params);

    addEnvMemory(params, {
      SESSION_SECRET: randomBytes(32).toString('hex')
    });
  }
}

export default generateFrameworkExpress;
