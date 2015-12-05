var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');

var mkdirs = Promise.promisify(fs.mkdirs);
var copy = Promise.promisify(fs.copy);
var readJson = Promise.promisify(fs.readJson);
var writeJson = Promise.promisify(fs.writeJson);

async function generateFrameworkExpress(params) {
  let root = path.dirname(require.main.filename);
  let build = path.join(root, 'build', params.uuid);
  let express = path.join(root, 'modules', 'express');

  // Copy initial Express files
  await copy(express, build);

  // Update package.json app name
  let packageJson = path.join(build, 'package.json');
  let packageObj = await readJson(packageJson);
  packageObj.name = params.appName;
  await writeJson(packageJson, packageObj, { spaces: 2 });

  // Create public dirs
  await mkdirs(path.join(build, 'public', 'images'));
  await mkdirs(path.join(build, 'public', 'javascripts'));
  await mkdirs(path.join(build, 'public', 'stylesheets'));
}

module.exports = generateFrameworkExpress;
