import { set } from 'lodash';
import { getModule, replaceCodeMemory } from '../utils';

export default async function generateAngularJsTemplate(params) {
  switch (params.framework) {
    case 'express':
      set(params, ['build', 'app', 'index.html'], await getModule('template-engine/angularjs/index.html'));

      if (params.buildTool === 'none') {
        await replaceCodeMemory(params, 'app/index.html', 'ANGULARJS_APP_IMPORT', await getModule('template-engine/angularjs/no-build-scripts.html'));
      } else {
        await replaceCodeMemory(params, 'app/index.html', 'ANGULARJS_APP_IMPORT', await getModule('template-engine/angularjs/build-scripts.html'));
      }

      // Add Socket.IO <script> tag (optional)
      if (params.frameworkOptions.includes('socketio')) {
        await replaceCodeMemory(params, 'app/index.html', 'SOCKETIO_IMPORT', await getModule('template-engine/angularjs/socketio-import.html'));
      }
      break;
    case 'meteor':
      break;
    default:
  }
}
