import { join } from 'path';
import { copy, mkdirs, addNpmPackage, replaceCode, removeCode } from '../utils';

// helper function
async function updateLayoutTemplate(params) {
  const layout = join(__base, 'build', params.uuid, 'views', 'layout.jade');

  const appContainer = join(__dirname, 'modules', 'jade', 'app-container.jade');
  const blockContent = join(__dirname, 'modules', 'jade', 'block-content.jade');
  const socketIoImport = join(__dirname, 'modules', 'jade', 'socketio-import.jade');

  if (params.jsFramework === 'none') {
    // Use "block content" (traditional web app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', blockContent, { indentLevel: 2 });
  } else {
    // Use "#app-container" div element (single page app)
    await replaceCode(layout, 'APP_CONTAINER_OR_BLOCK_CONTENT', appContainer, { indentLevel: 2 });
  }

  // Add Socket.IO <script> tag (optional)
  if (params.frameworkOptions.includes('socketio')) {
    await replaceCode(layout, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 2 });
  }
}

async function generateJsFrameworkReact(params) {
  const build = join(__base, 'build', params.uuid);
  const mainJs = join(__dirname, 'modules', 'react', 'main.js');
  const reactRequire = join(__dirname, 'modules', 'react', 'react-require.js');
  const app = join(build, 'app.js');

  switch (params.framework) {
    case 'express':
      const renderTemplateNunjucks = join(__dirname, 'modules', 'react', 'render-template-nunjucks.js');

      // Optional: React Router
      if (params.reactOptions && params.reactOptions.reactRouter) {
        const reactRouterServerRendering = join(__dirname, 'modules', 'react', 'react-router-server-rendering.js');
        await replaceCode(app, 'REACT_SERVER_RENDERING', reactRouterServerRendering);
      } else {
        const serverRendering = join(__dirname, 'modules', 'react', 'server-rendering.js');
        await replaceCode(app, 'REACT_SERVER_RENDERING', serverRendering);
      }

      switch (params.templateEngine) {
        case 'jade':
          const layoutJade = join(build, 'views', 'layout.jade');
          const bundleJadeImport = join(__dirname, 'modules', 'react', 'react-jade-import.jade');
          await replaceCode(layoutJade, 'JS_FRAMEWORK_MAIN_IMPORT', bundleJadeImport, { indentLevel: 2, leadingBlankLine: true });
          break;

        case 'handlebars':
          break;

        case 'nunjucks':
          const layoutNunjucks = join(build, 'views', 'layout.html');
          const bundleNunjucksImport = join(__dirname, 'modules', 'react', 'react-html-import.html');
          await replaceCode(layoutNunjucks, 'JS_FRAMEWORK_MAIN_IMPORT', bundleNunjucksImport, { indentLevel: 1 });
          await replaceCode(app, 'RENDER_TEMPLATE', renderTemplateNunjucks);
          break;

        default:
          break;
      }


      await replaceCode(app, 'REACT_REQUIRE', reactRequire);

      await addNpmPackage('react', params);
      await addNpmPackage('react-dom', params);

      await mkdirs(join(build, 'app', 'components'));
      await copy(mainJs, join(build, 'app', 'main.js'));

      break;

    case 'hapi':
      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateJsFrameworkReact;
