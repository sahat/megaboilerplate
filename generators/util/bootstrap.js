/*   eslint no-console: [0] */
/*   eslint no-loop-func: [0] */
/*   eslint strict: [0] */
'use strict';
// File to bootstrap a new boilderplate
// by removing files needed for the public repo (megaboilerplate)
// and creating files for the boilerplate
/**
 * Module dependencies
 */
const fs = require('fs');

// Vars
// Files to Remove
// Place your files here
const rmfiles = [
  'ISSUE_TEMPLATE.md'
];
// Files to make
const newfiles = [
  // Place file names in this format:
  // { name: 'file', content: 'file' }
];

/**
 * Logger
 * @param txt {String} - text to log
 */
function log(txt) {
  console.log(`==> ${txt}`);
}
/**
 * Logger alt
 * Witout ==>
 * but a space
 * @param txt {String} - text to log
 */
function logalt(txt) {
  console.log(`    ${txt}`);
}

/**
 * Bootstrap function
 */
module.exports = () => {
  log('Bootstraping your new boilerplate...');
  // Remove unneeded files
  log('Removing unneeded files...');
  // Remove the files
  if (rmfiles.length > 0) {
    let f;
    for (f of rmfiles) {
      if (fs.existsSync(f)) {
        fs.unlinkSync(f);
        logalt(`Removed file ${f}.`);
      }
    }
  } else {
    logalt('No file to remove.');
  }

  // Create the files
  log('Creating files...');
  if (newfiles.length > 0) {
    let f;
    // Create them
    for (f of newfiles) {
      fs.writeFile(f.name, f.content);
      logalt(`Created file ${f.name}.`);
    }
  } else {
    logalt('No files to create.');
  }

  log('Done bootstraping.');
};
