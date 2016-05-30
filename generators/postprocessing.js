import { get, set } from 'lodash';

/**
 * Special cases handling
 */
export default async function postprocessing(params) {
  // Move AngularJS app into 'public' directory
  if (params.buildTool === 'none') {
    if (params.jsFramework === 'angularjs') {
      // Move index.html to public dir
      set(params, ['build', 'public', 'index.html'], get(params, ['build', 'app', 'index.html']));
      set(params, ['build', 'app', 'index.html'], undefined);

      // Move partials to public dir
      set(params, ['build', 'public', 'partials'], get(params, ['build', 'app', 'partials']));
      set(params, ['build', 'app', 'partials'], undefined);

      // Move the rest files to public/js dir
      set(params, ['build', 'public', 'js', 'app.js'], get(params, ['build', 'app', 'app.js']));
      set(params, ['build', 'public', 'js', 'services'], get(params, ['build', 'app', 'services']));
      set(params, ['build', 'public', 'js', 'controllers'], get(params, ['build', 'app', 'controllers']));
      set(params, ['build', 'app'], undefined);
    }
  }
}
