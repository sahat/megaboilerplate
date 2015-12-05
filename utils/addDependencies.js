let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let readJson = Promise.promisify(fs.readJson);
let writeJson = Promise.promisify(fs.writeJson);

async function addDependencies(dependencies, params, isDev) {
  let packageJson = path.join(__base, 'build', params.uuid, 'package.json');

  let packageObj = await readJson(packageJson);

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

  await writeJson(packageJson, packageObj, { spaces: 2 });
}

module.exports = addDependencies;
