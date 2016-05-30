import { get, set } from 'lodash';

/**
 * Special cases handling
 */
export default async function postprocessing(params) {
  // Move AngularJS app into 'public' directory
  if (params.buildTool === 'none') {
    if (params.jsFramework === 'angularjs') {
      set(params, ['build', 'public', 'index.html'], get(params, ['build', 'app', 'index.html']));
      set(params, ['build', 'app', 'index.html'], undefined);

      set(params, ['build', 'public', 'partials'], get(params, ['build', 'app', 'partials']));
      set(params, ['build', 'app', 'partials'], undefined);

      set(params, ['build', 'public', 'js'], get(params, ['build', 'app']));
      set(params, ['build', 'app'], undefined);
    }
  }
}
