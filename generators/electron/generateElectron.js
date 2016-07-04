import { getModule, addEnvMemory, templateReplaceMemory, replaceCodeMemory, addNpmScriptMemory, addNpmPackageMemory } from '../utils';
import { set } from 'lodash';

async function generateElectron(params) {
  params.build = {
    app: {
      actions: {
        'counter.js': await getModule('electron/app/actions/counter.js')
      },
      components: {
        'Counter.css': await getModule('electron/app/components/Counter.css'),
        'Counter.js': await getModule('electron/app/components/Counter.js'),
        'Home.css': await getModule('electron/app/components/Home.css'),
        'Home.js': await getModule('electron/app/components/Home.js')
      },
      containers: {
        'App.js': await getModule('electron/app/containers/App.js'),
        'CounterPage.js': await getModule('electron/app/containers/CounterPage.js'),
        'DevTools.js': await getModule('electron/app/containers/DevTools.js'),
        'HomePage.js': await getModule('electron/app/containers/HomePage.js')
      },
      images: {
        'img.png': await getModule('electron/app/images/img.png'),
        'password.svg': await getModule('electron/app/images/password.svg'),
        'username.svg': await getModule('electron/app/images/username.svg')
      },
      reducers: {
        'counter.js': await getModule('electron/app/reducers/counter.js'),
        'index.js': await getModule('electron/app/reducers/index.js')
      },
      store: {
        'configureStore.development.js': await getModule('electron/app/store/configureStore.development.js'),
        'configureStore.js': await getModule('electron/app/store/configureStore.js'),
        'configureStore.production.js': await getModule('electron/app/store/configureStore.production.js')
      },
      'app.global.css': await getModule('electron/app/app.global.css'),
      'app.html': await getModule('electron/app/app.html'),
      'app.icns': await getModule('electron/app/app.icns'),
      'index.js': await getModule('electron/app/index.js'),
      'routes.js': await getModule('electron/app/routes.js'),
      'typography.global.css': await getModule('electron/app/typography.global.css')
    },
    test: {
      actions: {
        'counter.spec.js': await getModule('electron/test/actions/counter.spec.js')
      },
      components: {
        'Counter.spec.js': await getModule('electron/test/components/Counter.spec.js')
      },
      containers: {
        'CounterPage.spec.js': await getModule('electron/test/containers/CounterPage.spec.js')

      },
      reducers: {
        'counter.spec.js': await getModule('electron/test/reducers/counter.spec.js')
      },
      '.eslintrc': await getModule('electron/test/.eslintrc'),
      'e2e.js': await getModule('electron/test/e2e.js'),
      'example.js': await getModule('electron/test/example.js'),
      'setup.js': await getModule('electron/test/setup.js')
    },
    '.babelrc': await getModule('electron/.babelrc'),
    '.gitignore': await getModule('electron/.gitignore'),
    '.travis.yml': await getModule('electron/.travis.yml'),
    'main.development.js': await getModule('electron/main.development.js'),
    'package.js': await getModule('electron/package.js'),
    'package.json': await getModule('electron/package.json'),
    'server.js': await getModule('electron/server.js'),
    'webpack.config.base.js': await getModule('electron/webpack.config.base.js'),
    'webpack.config.development.js': await getModule('electron/webpack.config.development.js'),
    'webpack.config.electron.js': await getModule('electron/webpack.config.electron.js'),
    'webpack.config.node.js': await getModule('electron/webpack.config.node.js'),
    'webpack.config.production.js': await getModule('electron/webpack.config.production.js')
  };
}

export default generateElectron;
