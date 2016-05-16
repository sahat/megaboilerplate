import { join } from 'path';
import { move } from './utils';


/**
 * Special cases handling
 */
async function postprocessing(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');

  // Move AngularJS app into 'public' directory
  if (params.buildTool === 'none') {
    if (params.jsFramework === 'angularjs') {
      await move(join(build, 'app', 'index.html'), join(build, 'public', 'index.html'));
      await move(join(build, 'app', 'partials'), join(build, 'public', 'partials'));
      await move(join(build, 'app'), join(build, 'public', 'js'));
    }
  }
}

export default postprocessing;
