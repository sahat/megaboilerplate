# <%= libraryName %>
[![Build Status](https://travis-ci.org/sahat/requirejs-library.svg)](https://travis-ci.org/sahat/requirejs-library) [![devDependency Status](https://david-dm.org/sahat/requirejs-library/dev-status.svg?theme=shields.io)](https://david-dm.org/sahat/requirejs-library#info=devDependencies)

[![Travis build status](http://img.shields.io/travis/<%= user %>/<%= repo %>.svg?style=flat)](https://travis-ci.org/<%= user %>/<%= repo %>)
[![Code Climate](https://codeclimate.com/github/<%= user %>/<%= repo %>/badges/gpa.svg)](https://codeclimate.com/github/<%= user %>/<%= repo %>)
[![Test Coverage](https://codeclimate.com/github/<%= user %>/<%= repo %>/badges/coverage.svg)](https://codeclimate.com/github/<%= user %>/<%= repo %>)
[![Dependency Status]
[![Dependency Status](https://david-dm.org/<%= user %>/<%= repo %>.svg)](https://david-dm.org/<%= user %>/<%= repo %>)
[![devDependency Status](https://david-dm.org/<%= user %>/<%= repo %>/dev-status.svg)](https://david-dm.org/<%= user %>/<%= repo %>#info=devDependencies)

<img src="http://cache.preserve.io/9qwernji/assets/c6d7109e182d0d88cc312951d3e1d2f8.png" height="138">
<img src="http://verekia.com/wp-content/uploads/2011/11/require-js.png">
<img src="http://bower.io/img/bower-logo.png" height="138">

### Getting Started
The project depends on [Bower](https://github.com/bower/bower) and [Gulp.js](http://gulpjs.com). Assuming
you already have **Node.js** installed on your system, run the following command:

```
sudo npm install -g gulp bower
```

Next, clone the repository and install project dependencies:
```bash
# Fetch only the latest commits.
git clone --depth=1 git@github.com:sahat/requirejs-library.git

cd requirejs-library

bower install
npm install
```

With [Bower](https://github.com/bower/bower) you get the following libraries:
- **Almond** - A replacement AMD loader for RequireJS, providing the minimal AMD API footprint.
- **Require.js** - Used as an asynchronous module loader.
- **Jasmine** - Popular BDD testing framework.
- **Mocha** - Another great testing framework.
- **Chai** - BDD/TDD assertion library (used with Mocha).

And with **npm** you get the following packages:
- **Gulp** - Ultra-fast JavaScript task runner.
- **Require.js** - Used as an optimization tool that lets you to compile a single, minified JavaScript file.
- **Karma** - Awesome JavaScript test runner.


### Usage

This library is flexible enough to work as an inline **\<script\>** declaration, 
**Require.js** module, or in this case as a **Node.js** module:
![alt tex](https://lh4.googleusercontent.com/-fehV2cIkf0Y/UoB4-p2sJ-I/AAAAAAAADgA/HX_vKo0ZFpw/w1360-h954-no/Screenshot+2013-11-11+01.16.41.png)

You can run all demos right away *out of the box*, but if you have changed any of the **src** files, simply run the
following command to re-build the library and start watching for changes:
```
gulp
```

### Source Maps

Require.js optimizer comes with a built-in support to generate source maps. It is already enabled in **gulpfile**
by default, but feel free to disable source maps. Refer to [this article](https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#source-maps)
to enable source maps in Google Chrome, if you haven't already done so.
![alt text](https://lh6.googleusercontent.com/-_IhjVi3fN2A/UoB47nFh94I/AAAAAAAADgA/z6LHmjyqvbA/s2560/Screenshot+2013-11-11+01.15.12.png)

### Tests
Go to the **test** folder and run *SpecRunnerJasmine.html* and you should see the following page:
![alt text](https://lh6.googleusercontent.com/-9vlvxT94o0Y/UoB47u0jGQI/AAAAAAAADgA/AOginRb4OZ8/s2560/Screenshot+2013-11-11+01.15.43.png)
Only 2 out of 3 specs in the **test/spec** folder are written for the Jasmine testing framework: `slugify.js`, `random.js`.
For your project pick either **Jasmine** or **Mocha + Chai**, whichever one you prefer the most. Both testing frameworks
are excellent.

The other file, `capitalize.js` is written for the Mocha testing framework, using Chai's *should* assertions. 
Run the *SpecRunnerMocha.html* and you should see the following page:
![alt text](https://lh6.googleusercontent.com/-asAAIpVt_eI/UoB47vwV8ZI/AAAAAAAADgA/NT2Nu1bf1DU/w1238-h984-no/Screenshot+2013-11-11+01.15.55.png)

And lastly, if you prefer to run your tests with **Karma**, simply run:
```
npm test
```

Or if you have installed **Karma** globally via npm, first run `karma start`, then `karma run`. It will perform
a single test run using **Jasmine** testing framework via **PhantomJS** headless browser. Both testing framework
and browser are configurable in **karma.conf.js**. 

I have set `autoWatch: false` by default.
So, if you use something like *JetBrains WebStorm 7* for development, then you should keep `autoWatch` turned off. 
Here is the step-by-step guide: 
[Running JavaScript tests with Karma in WebStorm 7](http://blog.jetbrains.com/webstorm/2013/10/running-javascript-tests-with-karma-in-webstorm-7/)



### Structure

- **demo** - examples with Inline, AMD, CommonJS script loading
- **dist** - minified JavaScript file + source map
- **src**/*mylib.js* - entry-file that pulls all other modules
- **src**/*_start.js* - adds compatibility for AMD, CommonJS and Browser globals
- **src**/*_end.js* - serves the same purpose of the initial require() call that data-main does
- **test/spec** - jasmine and mocha specs
- **test**/SpecRunnerJasmine.html - standalone jasmine html spec runner
- **test**/SpecRunnerMocha.html - standalone mocha html spec runner
- *karma.conf.js* — karma test runner configuration
- **test**/*test-main.js* — configures karma to use Require.js for the tests


### Additional Notes

- When you are changing library's name from **mylib** to **YOUR_LIBRARY_NAME**, update names in the following locations:
 - src/mylib.js: **filename**
 - gulpfile.js: **out**, `out: "dist/YOUR_LIBRARY_NAME.js"`
 - gulpfile.js: **include**, `include: ['almond', 'YOUR_LIBRARY_NAME']`
 - src/_start.js: **else** statement, `window.YOUR_LIBRARY_NAME = factory();`
 - src/_end.js: **return** statement, `require('YOUR_LIBRARY_NAME');`

### Contributing
If you have any suggestions, or found a bug please open a GitHub issue and I will
get to it as soon as I can.

### License
The MIT License (MIT)

Copyright (c) 2014 Sahat Yalkabov

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
