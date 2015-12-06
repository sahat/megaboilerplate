let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let mkdirs = Promise.promisify(fs.mkdirs);
let readJson = Promise.promisify(fs.readJson);
let writeJson = Promise.promisify(fs.writeJson);

async function generateFrameworkExpress(params) {
  let build = path.join(__base, 'build', params.uuid);
  let express = path.join(__base, 'modules', 'framework', 'express');

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
