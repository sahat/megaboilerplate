import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateAngularJsTemplate(params) {
  const build = join(__base, 'build', params.uuid);
  switch (params.framework) {
    case 'express':
      // Copy index.html layout to "app" directory
      const indexHtml = join(__dirname, 'modules', 'angularjs', 'index.html');
      await copy(indexHtml, join(build, 'app', 'index.html'));

      // Add/remove features to the newly generated layout file above
      const socketIoImport = join(__dirname, 'modules', 'html-common', 'socketio-import.html');

      // Add Socket.IO <script> tag (optional)
      if (params.frameworkOptions.includes('socketio')) {
        await replaceCode(indexHtml, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 1 });
      }

      if (params.buildTool === 'none') {
        await replaceCode(build, 'ANGULARJS_APP_IMPORT', join(__dirname, 'modules', 'angularjs', 'no-build-scripts.html'));
      } else {
        await replaceCode(build, 'ANGULARJS_APP_IMPORT', join(__dirname, 'modules', 'angularjs', 'build-scripts.html'));
      }


      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateAngularJsTemplate;
