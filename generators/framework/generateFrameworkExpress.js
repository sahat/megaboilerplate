let path = require('path');
let fs = require('fs-extra');
let Promise = require('bluebird');
let copy = Promise.promisify(fs.copy);
let readFile = Promise.promisify(fs.readFile);
let outputFile = Promise.promisify(fs.outputFile);
let mkdirs = Promise.promisify(fs.mkdirs);
let _ = require('underscore');

async function generateFrameworkExpress(params) {
  let build = path.join(__base, 'build', params.uuid);
  let express = path.join(__base, 'modules', 'express');

  // Copy initial Express files
  await copy(express, build);

  // Update package.json app name
  let packageJson = path.join(build, 'package.json');
  let pkg = await readFile(packageJson);
  let template = _.template(pkg.toString());
  await outputFile(path.join(build, 'package.json'), template({ name: params.appName }));

  // Create public dirs
  await mkdirs(path.join(build, 'public', 'images'));
  await mkdirs(path.join(build, 'public', 'javascripts'));
  await mkdirs(path.join(build, 'public', 'stylesheets'));
}

module.exports = generateFrameworkExpress;
