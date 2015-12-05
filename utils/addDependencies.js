let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));

async function addDependencies(dependencies, params, isDev) {
  let packageJson = path.join(__base, 'build', params.uuid, 'package.json');

  let packageObj = await fs.readJson(packageJson);

  // Add "dependencies" or "devDependencies" to package.json
  for (var key in dependencies) {
    if (dependencies.hasOwnProperty(key)) {
      if (isDev) {
        packageObj.devDependencies = packageObj.devDependencies || {};
        packageObj.devDependencies[key] = dependencies[key];
      } else {
        packageObj.dependencies[key] = dependencies[key];
      }
    }
  }

  await fs.writeJson(packageJson, packageObj, { spaces: 2 });
}

module.exports = addDependencies;
