<img src="http://i.imgur.com/UNyLl3s.png" height="60">
 
[![Gitter](https://badges.gitter.im/sahat/megaboilerplate.svg)](https://gitter.im/sahat/megaboilerplate)
[![Build Status](https://travis-ci.org/sahat/megaboilerplate.svg?branch=master)](https://travis-ci.org/sahat/megaboilerplate)

Mega Boilerplate is a starter project generator that focuses on simplicity and ease of use, while providing you with flexibility of choices. It was heavily inspired by the [Hackathon Starter](https://github.com/sahat/hackathon-starter), but unlike it, you can customize any part of your application stack — from web framework and database to CSS preprocessor and client-side JavaScript framework. Currently, generators are primarily limited to Node.js web apps, but I am planning to expand support for other platforms and languages in the near future.

Table of Contents
-----------------

- [**Getting Started**](#getting-started)
 - [Express](#express)
 - [Meteor](#meteor)
 - [Jekyll](#jekyll)
 - [Middleman](#middleman)
 - [JS Library](#js-library)
- [**Database Setup**](#database-setup)
 - [MongoDB](#mongodb)
 - [MySQL](#mysql)
 - [PostgreSQL](#postgresql)
 - [SQLite](#sqlite)
- [**Project Structure**](#project-structure)
- [**Obtaining API Keys**](#obtaining-api-keys)
- [**Learning Resources**](#learning-resources)
 - [React / Redux](#react--redux)
- [**Cheatsheets**](#cheatsheets)
 - [ES6](#-es6-cheatsheet)
 - [JavaScript Date](#-javascript-date-cheatsheet)
- [**Deployment**](#deployment)
- [**FAQ**](#faq)
 - [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/50px-React.js_logo.svg.png" height="17"> React](#-react)
 - [<img src="https://angular.io/resources/images/logos/standard/shield-large.png" height="17"> Angular](#-angular)
- [**Changelog**](#changelog)
- [**Contributing**](#contributing)
- [**License**](#license)

Getting Started
---------------

### Prerequisites

- [Node.js 6.0](http://nodejs.org)
- [Git](https://git-scm.com/)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**: [Xcode](https://developer.apple.com/xcode/download/) or `xcode-select --install`
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**: [Visual C++ Build Tools 2015](http://go.microsoft.com/fwlink/?LinkId=691126)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**: `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17"> **Fedora**: `sudo dnf groupinstall "Development Tools"`
 - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17"> **OpenSUSE**: `sudo zypper install --type pattern devel_basis`

### Express
<img src="http://blog.newrelic.com/wp-content/uploads/expresslogo.png" height="70px">

Download and extract the project. Then in your Terminal type the following:

```shell
$ cd megaboilerplate-app

# Install NPM dependencies
$ npm install

# Start the app
$ node server.js

# Express server listening on port 3000
```

**Note**: If you have selected **Gulp** or **NPM** build tool, you may also need to run `npm run build` command.

**Note**: If you have selected a database, please make sure it is up and running. For additional information, see [**Database Setup**](#database-setup).



:top: <sub>[**back to top**](#table-of-contents)</sub>

### Jekyll
<img src="http://build.prestashop.com/assets/images/2015/04/jekyll.png" height="70px">

#### Prerequisites

- [Ruby 2.0+](http://rubyinstaller.org)
- [Jekyll](https://jekyllrb.com/) Ruby Gem

```shell
$ cd megaboilerplate-app

# Start Jekyll app
$ jekyll serve

# Server address: http://127.0.0.1:4000/
# Server running... press ctrl-c to stop.
```

:top: <sub>[**back to top**](#table-of-contents)</sub>


### Middleman
<img src="https://avatars2.githubusercontent.com/u/1280820?v=3&s=400" height="70px">

#### Prerequisites

- [Ruby 2.0+](http://rubyinstaller.org)
- [Middleman](https://middlemanapp.com/) Ruby Gem

```shell
$ cd megaboilerplate-app

# Install Ruby dependencies
$ bundle install

# Start Middleman app
$ bundle exec middleman

# The Middleman is loading
# View your site at "http://localhost:4567"
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

### JS Library

This JavaScript library boilerplate was inspired and based on Dan Abramov's [library-boilerplate](https://github.com/gaearon/library-boilerplate) project. The main idea here is you write your code in ES6, which then gets transpiled into CommonJS and UMD builds. Consider [lodash](https://lodash.com/) as an example - a very popular JavaScript library that supports ES6 `import`, CommonJS `require()` and can be used inside a browser via `<script>` tag.

```shell
$ cd megaboilerplate-app

# Install NPM dependencies
$ npm install

# ES5 / CommonJS build
$ npm run build

# UMD build
$ npm run build:umd

# Run tests
$ npm test
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

## Database Setup

- [MongoDB](#mongodb)
- [MySQL](#mysql)
- [PostgreSQL](#postgresql)
- [SQLite](#sqlite)

:top: <sub>[**back to top**](#table-of-contents)</sub>

### MongoDB
<img src="http://s3.amazonaws.com/info-mongodb-com/_com_assets/media/mongodb-logo-rgb.jpeg" height="70px">

<img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**

Install [Homebrew](http://brew.sh/) package manager. Then follow the steps below to install and setup MongoDB.

```shell
# Update Homebrew's package database
$ brew update

# Install MongoDB
$ brew install mongodb

# Create the data directory
$ sudo mkdir -p /data/db

# Set permissions for the data directory
$ sudo chown -R `whoami` /data/db

# Run MongoDB Server
$ mongod
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download and install the [current stable release](https://www.mongodb.org/downloads#production).
2. Create the data directory: **C:\data\db**.
3. Run MongoDB Server by opening `mongod.exe` in **C:\Program Files\MongoDB\Server\3.2\bin**.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Import the public key used by the package management system
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

# Create a source list file for MongoDB
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Update the repository
$ sudo apt-get update

# Install the latest stable version of MongoDB
$ sudo apt-get install -y mongodb-org

# Start MongoDB service
$ sudo service mongod start
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

### MySQL
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/640px-MySQL.svg.png" height="70px">

Use database settings below in the `.env` file.

| Key           | Value                                                             |
| ------------- |:-----------------------------------------------------------------:|
| `DB_HOST`     | localhost                                                         |
| `DB_USER`     | root                                                              |
| `DB_PASSWORD` | (use root password configured during installation or leave blank) |
| `DB_NAME`     | mysql                                                             |

<img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**

Install [Homebrew](http://brew.sh/) package manager. Then follow the steps below to install and start MySQL.

```shell
# Update Homebrew's package database
$ brew update

# Install MySQL
$ brew install mysql

# Start MySQL Server
$ mysql.server start
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download [MySQL Installer for Windows](http://dev.mysql.com/downloads/mysql/).
2. Start the installer and follow instructions until the installation is complete.
 - When prompted, choose *Server only* or *Developer Default* setup type.

**Note**: Alternatively, you may use [XAMPP](https://www.apachefriends.org/index.html), which already comes bundled with MySQL and phpMyAdmin.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Update the repository
$ sudo apt-get update
$ sudo apt-get upgrade

# Install MySQL
$ sudo apt-get install mysql-server
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

### PostgreSQL
<img src="http://yiqunc.org/wp-content/uploads/2013/12/postgresql-logo.png" height="70px">

Use database settings below in the `.env` file.

| Key           | Value                                                             |
| ------------- |:-----------------------------------------------------------------:|
| `DB_HOST`     | localhost                                                         |
| `DB_USER`     | postgres                                                          |
| `DB_PASSWORD` | (use root password configured during installation)                |
| `DB_NAME`     | postgres                                                          |

<img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**

Install [Homebrew](http://brew.sh/) package manager. Then follow the steps below to install and start PostgreSQL.

```shell
# Update Homebrew's package database
$ brew update

# Install PostgreSQL
$ brew install postgres

# Start PostgreSQL Server
$ postgres -D /usr/local/var/postgres
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download the latest version of [PostgreSQL Installer](http://www.enterprisedb.com/products-services-training/pgdownload#windows).
2. Start the installer and follow instructions until the installation is complete.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Update the repository
$ sudo apt-get update
$ sudo apt-get upgrade

# Install PostgreSQL
$ sudo apt-get install postgresql postgresql-contrib
```

### SQLite
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1280px-SQLite370.svg.png" height="70px">

No additional steps required. Package [`sqlite3`](https://www.npmjs.com/package/sqlite3) will be automatically installed during `npm install` in [**Getting Started**](#getting-started).

:top: <sub>[**back to top**](#table-of-contents)</sub>

Project Structure
-----------------

Due to the nature of this project, there are too many possible project structure variations to list here. For the sake of simplicity, let's consider just the following project types:

- [Traditional Node.js Web App](#-traditional-nodejs-web-app)
- [React App](#-react-app)
- [AngularJS App](#-angularjs-app)
- Meteor App

### <img src="https://nodejs.org/static/apple-touch-icon.png" align="top" height="34"> Traditional Node.js Web App

This is perhaps the most straightforward web app type that does not use any client-side JavaScript frameworks or build tools. Is also the closest thing to [Hackathon Starter](https://github.com/sahat/hackathon-starter) project.

```
.
├── config/                    # Configuration files for OAuth, database, etc.
│   ├── passport.js/           # Passport strategies
├── controllers/               # Express route handlers
├── models/                    # Express database models
├── public/                            
│   ├── css/                   # Sass/LESS/PostCSS/CSS stylesheets (both source and generated)
│   ├── fonts/                 # Web fonts
│   ├── js/                    # Client-side JavaScript and third-party vendor files
├── views/                     # Templates
├── test/                      # Unit tests                    
├── .env                       # API keys, passwords, and other sensitive information
├── server.js                  # Express application
└── package.json               # NPM Dependencies and scripts
```

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/50px-React.js_logo.svg.png" align="top" height="34"> React App

The new hotness of the web — Universal JavaScript app, powered by [React](http://facebook.github.io/react/), [Redux](http://redux.js.org/), [React Router](https://github.com/reactjs/react-router) and [Server Rendering](http://redux.js.org/docs/recipes/ServerRendering.html). 

**Note:** Some files were ommited like `gulpfile.js` and `webpack.config.js`.

```
.
├── app/                       # React application
│   ├── actions/               # Redux actions
│   ├── components/            # React components
│   ├── reducers/              # Redux reducers
│   ├── store/                 # Store initialization and configuration
│   ├── main.js                # Client-side app entry-point
│   ├── routes.js              # Universal application routes (React Router)
├── controllers/               # Express route handlers
├── models/                    # Express database models
├── public/                    
│   ├── css/                   # Sass/LESS/PostCSS/CSS stylesheets (both source and generated)
│   ├── fonts/                 # Font Awesome web fonts
│   ├── js/                    # Third-party vendor files and generated React app (bundle.js)
├── views/                    
│   ├── layout.jade            # Main container, into which React app is rendered
│   ├── loading.jade           # Loading spinner animation for OAuth 1.0 / 2.0 authentication flow inside a popup
├── .babelrc                   # Babel config
├── .env                       # API keys, passwords, and other sensitive information
├── server.js                  # Express application
└── package.json               # NPM Dependencies and scripts
```

### <img src="https://avatars0.githubusercontent.com/u/139426?v=3&s=400" align="top" height="34"> AngularJS App

Your typical MEAN stack (MongoDB, Express, AngularJS, Node.js). Originally, I was not planning on adding AngularJS 1.x generator, especailly with Angular 2 around the corner. So without investing too much time, I kept it real simple: **no Browserify, no ES6 classes, no AngularJS 1.5 components**. Once officially released, Angular 2 generator will be more elaborate with quite a few additional options.

```
.
├── app/                       # Angular app directory
│   ├── controllers/           # Angular controllers
│   ├── partials/              # Angular view templates
│   ├── services/              # Angular services
│   ├── store/                 # Store initialization and configuration
│   ├── app.js                 # Main Angular app file
│   ├── index.html             # Main layout template
├── controllers/               # Express route handlers
├── models/                    # Express database models
├── public/                    
│   ├── css/                   # Sass/LESS/PostCSS/CSS stylesheets (both source and generated)
│   ├── js/                    # Compiled Angular app and third-party vendor files, e.g. angular.js, angular-route.js
├── .env                       # API keys, passwords, and other sensitive information
├── gulpfile.js                # Compiles Angular application and templates
├── server.js                  # Express application
└── package.json               # NPM Dependencies and scripts
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

Obtaining API Keys
------------------

To use any of the included OAuth providers (e.g. Facebook, Twitter, Google), you will need to obtain API keys. I have included "throw-away" API keys for all OAuth providers to get you up and running quickly, but be sure to update them with your own keys.

<img src="http://www.doit.ba/img/facebook.jpg" width="200">
- Go to [Facebook Developers](https://developers.facebook.com/).
- Click on **My Apps** dropdown, then select **Add a New App**.
- Select **Website** platform, then click on **Skip and Create App ID** button.
- Enter a **name** and choose a **category** for your app.
- Click on **Create App ID** button.
- Copy and paste **App ID** and **App Secret** keys into `.env` file:
 - `FACEBOOK_ID='YOUR_APP_ID'`
 - `FACEBOOK_SECRET='YOUR_APP_SECRET'`
- Click on the **Settings** tab, then click on **+ Add Platform** button.
- Select **Website**, then enter `http://localhost:3000/auth/facebook/callback` in the **Site URL**.

**Note**: If you are using React or AngularJS, copy and paste **App Secret** into `.env` file and **App ID** into *app/actions/oauth.js* (React) and *app/app.js* (AngularJS).

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1000px-Google_2015_logo.svg.png" width="200">
- Go to [Google Cloud Console](https://cloud.google.com/console/project)
- Click on **Create project** button.
- Enter a **Project name**, then click on **Create** button.
- Click on **Use Google APIs** (Enable and manage APIs) panel.
- Click on **Credentials** tab in the sidebar.
- Client on **Create credentials** dropdown, then select **OAuth client ID**.
- Select or enter the following:
 - **Application type**: `Web application`
 - **Authorized JavaScript origins**: `http://localhost:3000`
 - **Authorized redirect URIs**: `http://localhost:3000/auth/google/callback`
- Click on **Create** button.
- Copy and paste **client ID** and **client secret** keys into `.env` file:
  - `GOOGLE_ID='YOUR_CLIENT_ID'`
  - `GOOGLE_SECRET='YOUR_CLIENT_SECRET'`

**Note**: If you are using React or AngularJS, copy and paste **client secret** into `.env` file and **client ID** into *app/actions/oauth.js* (React) and *app/app.js* (AngularJS).

<img src="https://g.twimg.com/ios_homescreen_icon.png" width="75">
- Go to [Twitter Application Management](https://apps.twitter.com/).
- Click on **Create New App** button.
- Fill out required fields.
 - **Callback URL**: `http://127.0.0.1:3000/auth/twitter/callback`
- Go to **Settings** tab.
- Click on **Allow this application to be used to Sign in with Twitter** checkbox.
- Click on **Update Settings** button.
- Go to **Keys and Access Tokens** tab.
- Copy and paste **Consumer Key** and **Consumer Secret** keys into `.env` file:
 - `TWITTER_ID='YOUR_CONSUMER_KEY'`
 - `TWITTER_SECRET='YOUR_CONSUMER_SECRET'`

**Note**: If you are using React or AngularJS, copy and paste **Consumer Secret** into `.env` file and **Consumer Key** into *app/actions/oauth.js* (React) and *app/app.js* (AngularJS).

<img src="https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/vkontakte-256.png" height="75">
- Go to [Developers | VK](http://new.vk.com/dev)
- Click on **Create an Application** button.
- Enter a **Title** and select a **Category** (Website), then click on **Connect Application** button.
- Confirm activation code via your mobile number.
- Click on **Settings** tab in the sidebar.
- Select or enter the following:
 - **Application status**: `Application on and visible to all`
 - **Site address**: `http://localhost:3000`
 - **Authorized redirect URI**: `http://localhost:3000/auth/vkontakte/callback`
- Copy and paste **Application ID** and **Secure key** into `.env` file:
 - `VK_ID='YOUR_APPLICATION_ID'`
 - `VK_SECRET='YOUR_SECURE_KEY'`

**Note**: If you are using React or AngularJS, copy and paste **Secure key** into `.env` file and **Application ID** into *app/actions/oauth.js* (React) and *app/app.js* (AngularJS).

<img src="https://upload.wikimedia.org/wikipedia/commons/2/24/GitHub_logo_2013_padded.svg" width="200">
- Go to [Github Developer Applications Settings](https://github.com/settings/developers)
- Click on **Register a new application** button.
- Fill out required fields.
 - **Application Name**
 - **Homepage URL**
 - **Callback URL**: `http://127.0.0.1:3000/auth/github/callback`
- Click on **Register application**
- Copy and paste **client ID** and **client secret** keys into `.env` file:
  - `GITHUB_ID='YOUR_CLIENT_ID'`
  - `GITHUB_SECRET='YOUR_CLIENT_SECRET'`

**Note**: If you are using React or AngularJS, copy and paste **client secret** into `.env` file and **client ID** into *app/actions/oauth.js* (React) and *app/app.js* (AngularJS).

:top: <sub>[**back to top**](#table-of-contents)</sub>

Learning Resources
------------------

### Web Tools
- [HTML to Jade converter](http://html2jade.aaron-powell.com/)
- [SassMe - A Tool for Visualizing SASS Color Functions](http://sassme.arc90.com/)
- [uiGradients](http://uigradients.com/)

### Express
- [Creating a Simple RESTful Web App with Node.js, Express, and MongoDB](http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/)
- [How To Implement Password Reset In Node.js](http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/)

### React / Redux
- [:movie_camera: React in 7 Minutes](https://egghead.io/lessons/react-react-in-7-minutes)
- [:movie_camera: Getting Started with Redux (30 free videos)](https://egghead.io/series/getting-started-with-redux)
- [:movie_camera: Building React Applications with Idiomatic Redux (27 free videos)](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)
- [:book: Create a character voting app using React, Node.js, MongoDB and Socket.IO](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)
- [:book: Handcrafting an Isomorphic Redux Application](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.vft63avyi)
- [:book: React.js Introduction For People Who Know Just Enough jQuery To Get By](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/)

### Performance and SEO
- [Managing Mobile Performance Optimization](https://www.smashingmagazine.com/2016/03/managing-mobile-performance-optimization)
- [A technical guide to SEO](https://ma.ttias.be/technical-guide-seo/)

### AngularJS
- [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide/)
- [Build an Instagram clone with AngularJS, Satellizer, Node.js and MongoDB](http://sahatyalkabov.com/build-an-instagram-clone-using-angularjs-satellizer-nodejs-and-mongodb/)
- [Create a TV Show Tracker using AngularJS, Node.js and MongoDB](http://sahatyalkabov.com/create-a-tv-show-tracker-using-angularjs-nodejs-and-mongodb/)

### Jekyll
- [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
- [Build A Blog With Jekyll And GitHub Pages](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/)

### Middleman
- [How to Setup a Static Website with Middleman](http://webdesign.tutsplus.com/articles/how-to-setup-a-static-website-with-middleman--cms-25275)
- [Static Website Generators Reviewed: Jekyll, Middleman, Roots, Hugo](https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/)

### JS Library
- [:movie_camera: How to Write an Open Source JavaScript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

### Bookshelf.js (SQL ORM)
- [Bookshelf.js: A Node.js ORM](http://stackabuse.com/bookshelf-js-a-node-js-orm/)
- [Getting Started with Bookshelf.js](https://joepettit.com/bookshelf-js/)

### Mongoose (MongoDB ODM)
- [Easily Develop Node.js and MongoDB Apps with Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
- [Object Modeling in Node.js with Mongoose](https://devcenter.heroku.com/articles/nodejs-mongoose)

:top: <sub>[**back to top**](#table-of-contents)</sub>

Cheatsheets
-----------

### <img src="https://frontendmasters.com/assets/es6-logo.png" height="34" align="top"> ES6 Cheatsheet

#### Declarations

Declares a read-only named constant.

```js
const name = 'yourName';
```

Declares a block scope local variable.
```js
let index = 0;
```

#### Template Strings

Using the **\`${}\`** syntax, strings can embed expressions.

```js
const name = 'Oggy';
const age = 3;

console.log(`My cat is named ${name} and is ${age} years old.`);
```

#### Modules

To import functions, objects or primitives exported from an external module. These are the most common types of importing.

```js
import name from 'module-name';
```
```js
import * as name from 'module-name';
```
```js
import { foo, bar } from 'module-name';
```

To export functions, objects or primitives from a given file or module.

```js
export { myFunction };
```
```js
export const name = 'yourName';
```
```js
export default myFunctionOrClass
```

#### Spread Operator

The spread operator allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) are expected.

```js
myFunction(...iterableObject);
```
```jsx
<ChildComponent {...this.props} />
```

#### Promises

A Promise is used in asynchronous computations to represent an operation that hasn't completed yet, but is expected in the future.

```js
var p = new Promise(function(resolve, reject) { });
```

The `catch()` method returns a Promise and deals with rejected cases only.

```js
p.catch(function(reason) { /* handle rejection */ });
```

The `then()` method returns a Promise. It takes 2 arguments: callback for the success & failure cases.

```js
p.then(function(value) { /* handle fulfillment */, function(reason) { /* handle rejection */ });
```

The `Promise.all(iterable)` method returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.

```js
Promise.all([p1, p2, p3]).then(function(values) { console.log(values) });
```

#### Arrow Functions

Arrow function expression. Shorter syntax & lexically binds the `this` value. Arrow functions are anonymous.

```js
singleParam => { statements }
```
```js
() => { statements }
```
```js
(param1, param2) => expression
```
```js
const arr = [1, 2, 3, 4, 5];
const squares = arr.map(x => x * x);
```

#### Classes

The class declaration creates a new class using prototype-based inheritance.

```js
class Person {
  constructor(name, age, gender) {
    this.name   = name;
    this.age    = age;
    this.gender = gender;
  }

  incrementAge() {
    this.age++;
  }
}
```

:gift: **Credits**: [DuckDuckGo](https://duckduckgo.com/?q=es6+cheatsheet&ia=cheatsheet&iax=1) and [@DrkSephy](https://github.com/DrkSephy/es6-cheatsheet).

:top: <sub>[**back to top**](#table-of-contents)</sub>

### <img src="http://i.stack.imgur.com/Mmww2.png" height="34" align="top"> JavaScript Date Cheatsheet

#### Unix Timestamp (seconds)

```js
Math.floor(Date.now() / 1000);
```

#### Add 30 minutes to a Date object

```js
var now = new Date();
now.setMinutes(now.getMinutes() + 30);
```

#### Date Formatting

```js
// DD-MM-YYYY
var now = new Date();

var DD = now.getDate();
var MM = now.getMonth() + 1;
var YYYY = now.getFullYear();

if (DD < 10) {
  DD = '0' + DD;
} 

if (MM < 10) {
  MM = '0' + MM;
}

console.log(MM + '-' + DD + '-' + YYYY); // 03-30-2016
```
```js
// hh:mm (12 hour time with am/pm)
var now = new Date();
var hours = now.getHours();
var minutes = now.getMinutes();
var amPm = hours >= 12 ? 'pm' : 'am';

hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0' + minutes : minutes;

console.log(hours + ':' + minutes + ' ' + amPm); // 1:43 am
```

#### Next week Date object

```js
var today = new Date();
var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
```

#### Yesterday Date object

```js
var today = new Date();
var yesterday = date.setDate(date.getDate() - 1);
```

:top: <sub>[**back to top**](#table-of-contents)</sub>


Deployment
----------

Once you are ready to deploy your app, you will need to create an account with
a cloud platform to host it. These are not the only choices you have, but they are my top
picks.

### Heroku
<img src="https://camo.githubusercontent.com/fb89a03a7dd0393851b9ed3720742b738944d863/687474703a2f2f7265732e636c6f7564696e6172792e636f6d2f646a7a6c356b6d61372f696d6167652f75706c6f61642f76313433373838333435312f4865726f6b755f6c6f676f5f6d6f6b7369702e706e67" width="200">

- Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/)
- In Terminal, run `heroku login`, then enter your Heroku credentials
- Navigate to the **megaboilerplate-app** directory and run the following commands:
 1. `git init`
 2. `git add .`
 3. `git commit -m 'Initial commit'`
- Then run `heroku create` to create a new Heroku app and link it with your current Git repository

   ```bash
   Creating app... done, ⬢ floating-mesa-51019
   https://floating-mesa-51019.herokuapp.com/ | https://git.heroku.com/floating-mesa-51019.git
   ```
   
- Run `git push heroku master` and you are done!

**Note**: If you have created a new app via Heroku Dashboard, you can link it with an existing Git repository by running:

```bash
heroku git:remote -a your-heroku-app-name
```

For more information, please visit [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).

#### Heroku + PostgreSQL

Connecting to a [Heroku Postgres](https://postgres.heroku.com) database from outside of the Heroku network requires SSL. Furthermore, connection string given by Heroku (`DATABASE_URL`) does not have `"?ssl=true"` parameter by default.

The simplest solution is to add `PGSSLMODE=require` config var in the Heroku dashboard or via CLI: `heroku config:set PGSSLMODE=require`.

**TODO:** Deployment instructions for SQL and MongoDB databases. (~~Heroku Postgres~~, Compose, MongoLab)

### Microsoft Azure
<img src="https://worldvectorlogo.com/logos/microsoft-azure-2.svg" width="200">

- Sign in to your account at [Azure Portal](https://portal.azure.com/)
- Click on <img src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAASJAAAAJDZlNmM0YmIyLWZjYWQtNDRjMC05NDAzLTVkNGQ4ZWY4NzcxYw.png" height="17px"> **App Services**, then click on **Add** button
- Enter an *App name* for your app and create or select an existing *Resource Group*
- Click on **Create** button and give it 15-20 seconds 
- Find and select your app under **App Services**
- In the right-hand **Settings** sidebar, find and click on **Deployment source**
- Under **Choose Source** select **Local Git Repository**, then press **OK**
 - Alternatively, you can choose **GitHub** to sync Azure with a GitHub repository for continous deployment
- Right below **Deployment source**, click on **Deployment credentials** and create new username and password, then hit **Save**
- Still inside **Settings** sidebar, find and click on **Properties** located under General settings
- Copy **Git URL**, e.g. `https://username@appname.scm.azurewebsites.net:443/appname.git`
- Navigate to the **megaboilerplate-app** directory and run the following commands:
 1. `git init`
 2. `git add .`
 3. `git commit -m 'Initial commit'`
 4. `git remote add azure https://username@appname.scm.azurewebsites.net:443/appname.git`
   - **Note**: Use your Git URL from above 
- Run `git push azure master`, and when prompted, enter your password created under **Deployment credentials**
- All set!

### Digital Ocean
<img src="https://www.digitalocean.com/assets/images/logos-badges/png/DO_Logo_Vertical_Blue-2c654e19.png" width="200">

TODO

:top: <sub>[**back to top**](#table-of-contents)</sub>

FAQ
---

- [React](#-react)
 - [Actions, reducers, stores, containers, provider...what? ಠ_ರೃ](#user-content-actions-reducers-stores-containers-providerwhat-ಠ_ರೃ)
 
:top: <sub>[**back to top**](#table-of-contents)</sub>

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/50px-React.js_logo.svg.png" align="top" height="34"> React

#### Actions, reducers, stores, containers, provider...what? ಠ_ರೃ

Despite being such a small library, [Redux](http://redux.js.org/) can be difficult to grasp for beginners. It took me almost three days until Redux "clicked" for me, even with my prior experience of working with React and Flux. Here is a TL;DR: summary:

| Concept       | Description                                                       |
| ------------- |:-----------------------------------------------------------------:|
| **Actions**   | Your application events, e.g. fetch data from server. Success and failure events of data fetching could also be actions. Actions are just plain JavaScript objects. They typically have some data associated with it. For example, `LOGIN_ERROR` action may contain an error message. Actions describe the fact that something happened, but don't specify how the application’s state changes in response. This is the job of a reducer. |
| **Reducers**  | Basically your action handlers, internally implemented via [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). This is where you specify how should the application state be updated when `LOGIN_ERROR` action is dispatched, for example. And that's it. How that state affects your application should still be managed in your components. One thing to note, **you never mutate the state**, but rather create a new copy of your current state + new changes using [`Object.assign()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). |
| **Store**     | Brings **actions** and **reducers** together. Store holds entire application state, allows you access current state via `getState()`, and update application state via `dispatch(action)`. You typically have just one Redux store that is configured during the inital bootstrap stage. |
| **Provider**     | Syntactic sugar from [react-redux](https://github.com/reactjs/react-redux) library. [`<Provider>`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) component wrapper makes the Redux store available to the [`connect()`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) function. Alternatively, you can manually pass `store` as a prop to every `connect()`ed component. [`connect()`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) is another syntactic sugar provided by react-redux which connects a React component to a Redux store. Alternatively, you can manually subscribe/unsubscribe to/from a store during `componentDidMount()` and `componentDidUnmount()` lifecycle of each component. |
| **Container** | So-called smart components that are aware of Redux, whereas traditional components are now considered dumb components, which are not aware of Redux; they just render markup with given props. I intentionally combined containers and components into simply — *components* for the sake of simplicity.

:top: <sub>[**back to faq**](#faq)</sub>

Backers
-------
Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/megaboilerplate#backer)]

<a href="https://opencollective.com/megaboilerplate/backer/0/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/1/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/2/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/3/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/4/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/5/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/6/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/7/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/8/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/9/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/10/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/11/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/12/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/13/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/14/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/15/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/16/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/17/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/18/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/19/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/20/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/21/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/22/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/23/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/24/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/25/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/26/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/27/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/28/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/backer/29/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/backer/29/avatar.svg"></a>


Sponsors
--------
Become a sponsor and get your logo on our website and on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/megaboilerplate#sponsor)]

<a href="https://opencollective.com/megaboilerplate/sponsor/0/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/1/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/2/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/3/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/4/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/5/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/6/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/7/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/8/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/9/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/10/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/11/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/12/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/13/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/14/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/15/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/16/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/17/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/18/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/19/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/20/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/21/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/22/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/23/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/24/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/25/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/26/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/27/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/28/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/megaboilerplate/sponsor/29/website" target="_blank"><img src="https://opencollective.com/megaboilerplate/sponsor/29/avatar.svg"></a>



Sites Built with Mega Boilerplate
---------------------------------

If you have built an app using Mega Boilerplate, please enter yourself here by sending a pull request.

Changelog
---------

### 1.1.0 (June 10, 2016)
- Added Stylus CSS preprocessor support when no CSS Framework is selected.
- Generate `README.md` for each boilerplate with selected choices.
- Enabled Webpack hot module replacement for Redux reducers.
- Updated React 15.0.2 to 15.1.0.
- Removed unused lodash require() in the user controller.
- Improved responsive design of login and signup container (Bootstrap).
- Fixed indentation inside profile update controller (SQL).
- Hide `password` field when calling `toJSON()` method on user model (Bookshelf.js / SQL).
- Fixed a bug where an error was thrown after user updates their profile (SQL only).
- Fixed invalid file path for Bootstrap CSS/JS imports inside `layout.jade`.
- `knexfile.js` is no longer generated twice.
- Updated Redux learning resources section in README.
- Added special instructions to "Obtaining API Keys" section for React / AngularJS.

### 1.0.0 (June 8, 2016)
- Initial release.

Contributing
------------

Pull requests from beginners and seasoned JavaScript developers are welcome! As it stands, Mega Boilerplate is pretty large in scope to be maintained by a single person, so I am asking for your help to contribute where you can, whether it's a small fix in README or adding a whole new generator type, e.g. Meteor, Angular 2, React Native, Electron.

:top: <sub>[**back to top**](#table-of-contents)</sub>

License
-------

MIT
