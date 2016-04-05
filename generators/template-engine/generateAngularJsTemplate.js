import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateAngularJsTemplate(params) {
  switch (params.framework) {
    case 'express':
      // Copy index.html layout to "app" directory
      const indexHtml = join(__dirname, 'modules', 'angularjs', 'index.html');
      await copy(indexHtml, join(__base, 'build', params.uuid, 'app', 'index.html'));

      // Add/remove features to the newly generated layout file above
      const socketIoImport = join(__dirname, 'modules', 'html-common', 'socketio-import.html');

      // Add Socket.IO <script> tag (optional)
      if (params.frameworkOptions.includes('socketio')) {
        await replaceCode(indexHtml, 'SOCKETIO_IMPORT', socketIoImport, { indentLevel: 1 });
      }

      break;

    case 'meteor':
      break;

    default:
  }
}

export default generateAngularJsTemplate;
