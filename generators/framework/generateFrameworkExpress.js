let path = require('path');
let Promise = require('bluebird');
let fs = Promise.promisifyAll(require('fs-extra'));

async function generateFrameworkExpress(params) {
  let build = path.join(__base, 'build', params.uuid);
  let express = path.join(__base, 'modules', 'express');

  // Copy initial Express files
  await fs.copy(express, build);

  // Update package.json app name
  let packageJson = path.join(build, 'package.json');
  let packageObj = await fs.readJson(packageJson);
  packageObj.name = params.appName;
  await fs.writeJson(packageJson, packageObj, { spaces: 2 });

  // Create public dirs
  await fs.mkdirs(path.join(build, 'public', 'images'));
  await fs.mkdirs(path.join(build, 'public', 'javascripts'));
  await fs.mkdirs(path.join(build, 'public', 'stylesheets'));
}

module.exports = generateFrameworkExpress;
