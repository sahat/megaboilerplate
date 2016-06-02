# <a href="http://megaboilerplate.com"><img src="http://i.imgur.com/UNyLl3s.png" height="60"></a> 
 
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal-0070ba.svg?style=flat)](https://paypal.me/sahat) [![Gitter](https://badges.gitter.im/sahat/megaboilerplate.svg)](https://gitter.im/sahat/megaboilerplate)
[![Build Status](https://travis-ci.org/sahat/megaboilerplate.svg?branch=master)](https://travis-ci.org/sahat/megaboilerplate)
[![Issues](https://img.shields.io/github/issues/sahat/boilerplate.svg?style=flat)](https://github.com/sahat/boilerplate/issues)
[![Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/sahat)

**Live Demo**: **http://megaboilerplate.com**

Mega Boilerplate is a starter project generator that focuses on simplicity and ease of use, while providing you with flexibility of choices. It was inspired by [Hackathon Starter](https://github.com/sahat/hackathon-starter), but unlike it, you are free to customize any part of your stack from web framework and database to CSS preprocessor and client-side JavaScript framework. Currently, generators are primarily limited to Node.js web apps, but I would like to expand it to other platforms and languages in the future.


Table of Contents
-----------------

- [**Features**](#features)
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

Features
--------

- :white_check_mark: Generate your perfect boilerplate from hundreds of possible permutations!
- :white_check_mark: Jade, Handlebars and Nunjucks template engines
- :white_check_mark: Sass, LESS, PostCSS and vanilla CSS stylesheets
- :white_check_mark: Bootstrap 3.5 and Foundation 6 CSS frameworks
- :white_check_mark: Mocha and Jasmine testing frameworks
- :white_check_mark: Gulp, Webpack and NPM scripts as build tools
- :white_check_mark: PostgreSQL, MySQL, SQLite and MongoDB databases
- :white_check_mark: React with server-side rendering and hot reloading, AngularJS and jQuery on the client-side
- **Generated application includes**:
 - :white_check_mark: Local Authentication using Email and Password
 - :white_check_mark: OAuth Authentication via Twitter, Facebook, Google, VK (Passport.js and JWT)
 - :white_check_mark: Flash notifications
 - :white_check_mark: Contact form (powered by Mailgun)
 - :white_check_mark: **Account Management**
   - Gravatar, Profile Details, Change Password, Forgot Password, Reset Password, Delete Account, Link multiple OAuth strategies to one account

Getting Started
---------------

### Prerequisites

- [Node.js 6.0](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**: `xcode-select --install`
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**: [Visual C++ Build Tools 2015](http://go.microsoft.com/fwlink/?LinkId=691126)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**: `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17"> **Fedora**: `sudo dnf groupinstall "Development Tools"`
 - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17"> **OpenSUSE**: `sudo zypper install --type pattern devel_basis`

### Express

Download and extract the project. Then in your Terminal type the following:

```shell
cd megaboilerplate-app

# Install NPM dependencies
npm install

node server.js
```

**Note**: If you have selected **Gulp** or **NPM** build tool, you may also need to run `npm run build` command.

**Note**: If you have selected a database, please make sure it is up and running. For additional information, see [**Database Setup**](#database-setup).



:top: <sub>[**back to top**](#table-of-contents)</sub>

### Jekyll

#### Prerequisites

- [Ruby 2.0+](http://rubyinstaller.org)
- [Jekyll](https://jekyllrb.com/) Ruby Gem

```shell
cd megaboilerplate-app

# Start Jekyll app
jekyll serve

# Server address: http://127.0.0.1:4000/
# Server running... press ctrl-c to stop.
```

:top: <sub>[**back to top**](#table-of-contents)</sub>


### Middleman

#### Prerequisites

- [Ruby 2.0+](http://rubyinstaller.org)
- [Middleman](https://middlemanapp.com/) Ruby Gem

```shell
cd myproject

# Install Ruby dependencies
bundle install

# Start Middleman app
bundle exec middleman

# The Middleman is loading
# View your site at "http://localhost:4567"
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

## Database Setup

- [MongoDB](#mongodb)
- [MySQL](#mysql)
- [PostgreSQL](#postgresql)
- [SQLite](#sqlite)

:top: <sub>[**back to top**](#table-of-contents)</sub>

### MongoDB

<img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**

Install [Homebrew](http://brew.sh/) package manager. Then follow the steps below to install and setup MongoDB.

```shell
# Update Homebrew's package database
brew update

# Install MongoDB
brew install mongodb

# Create the data directory
sudo mkdir -p /data/db

# Set permissions for the data directory
sudo chown -R `whoami` /data/db

# Run MongoDB Server
mongod
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download and install the [current stable release](https://www.mongodb.org/downloads#production).
2. Create the data directory: **C:\data\db**.
3. Run MongoDB Server by opening `mongod.exe` in **C:\Program Files\MongoDB\Server\3.2\bin**.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Import the public key used by the package management system
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

# Create a source list file for MongoDB
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Update the repository
sudo apt-get update

# Install the latest stable version of MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo service mongod start
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

### MySQL

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
brew update

# Install MySQL
brew install mysql

# Start MySQL Server
mysql.server start
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download [MySQL Installer for Windows](http://dev.mysql.com/downloads/mysql/).
2. Start the installer and follow instructions until the installation is complete.
 - When prompted, choose *Server only* or *Developer Default* setup type.

**Note**: Alternatively, you may use [XAMPP](https://www.apachefriends.org/index.html), which already comes bundled with MySQL and phpMyAdmin.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Update the repository
sudo apt-get update
sudo apt-get upgrade

# Install MySQL
sudo apt-get install mysql-server
```

:top: <sub>[**back to top**](#table-of-contents)</sub>

### PostgreSQL

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
brew update

# Install PostgreSQL
brew install postgres

# Start PostgreSQL Server
postgres -D /usr/local/var/postgres
```

<img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**

1. Download the latest version of [PostgreSQL Installer](http://www.enterprisedb.com/products-services-training/pgdownload#windows).
2. Start the installer and follow instructions until the installation is complete.

<img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**

```shell
# Update the repository
sudo apt-get update
sudo apt-get upgrade

# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib
```

### SQLite

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

Your typical MEAN stack (MongoDB, Express, AngularJS, Node). Originally I didn't plan on adding AngularJS 1.x generator, but since I did, I kept it real simple: **no Browserify, no ES6 classes, no AngularJS 1.5 components**. Admittedly, My experience with this framework is limited to a brief encounter in 2014, so I don't know a whole lot about modern AngularJS best practices. I would love your contributions here!

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
- Select **Website**, then enter `http://localhost:3000/auth/callback` in the **Site URL**.

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

:top: <sub>[**back to top**](#table-of-contents)</sub>

Learning Resources
------------------

### Web Tools
- [HTML to Jade converter](http://html2jade.aaron-powell.com/)
- [SassMe - A Tool for Visualizing SASS Color Functions](http://sassme.arc90.com/)
- [uiGradients](http://uigradients.com/)

### React / Redux
- [:movie_camera: React in 7 Minutes](https://egghead.io/lessons/react-react-in-7-minutes)
- [:movie_camera: Getting Started with Redux (30 free videos)](https://egghead.io/series/getting-started-with-redux)
- [:notebook_with_decorative_cover: Handcrafting an Isomorphic Redux Application](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.vft63avyi)
- [:notebook_with_decorative_cover: Create a character voting app using React, Node.js, MongoDB and Socket.IO](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)
- [:notebook_with_decorative_cover: React.js Introduction For People Who Know Just Enough jQuery To Get By](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/)

### Performance and SEO
- [Managing Mobile Performance Optimization](https://www.smashingmagazine.com/2016/03/managing-mobile-performance-optimization)
- [A technical guide to SEO](https://ma.ttias.be/technical-guide-seo/)

### AngularJS
- [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide/)

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
picks. From my experience, **Heroku** is the easiest to get started with, it will
automatically restart your Node.js process when it crashes, zero-downtime
deployments and custom domain support on free accounts.

<img src="http://blog.exadel.com/wp-content/uploads/2013/10/heroku-Logo-1.jpg" width="200">

- Download and install [Heroku Toolbelt](https://toolbelt.heroku.com/)
- In terminal, run `heroku login` and enter your Heroku credentials
- From *your app* directory run `heroku create`
- Run `heroku addons:create mongolab`.  This will set up the mLab add-on and configure the `MONGOLAB_URI` environment variable in your Heroku app for you.
- Lastly, do `git push heroku master`.  Done!

**Note:** To install Heroku add-ons your account must be verified.

<img src="http://www.opencloudconf.com/images/openshift_logo.png" width="200">

- First, install this Ruby gem: `sudo gem install rhc` :gem:
- Run `rhc login` and enter your OpenShift credentials
- From your app directory run `rhc app create MyApp nodejs-0.10`
 - **Note:** *MyApp* is the name your app (no spaces)
- Once that is done, you will be provided with **URL**, **SSH** and **Git Remote** links
- Visit provided **URL** and you should see the *Welcome to your Node.js application on OpenShift* page
- Copy and and paste **Git Remote** into `git remote add openshift YOUR_GIT_REMOTE`
- Before you push your app, you need to do a few modifications to your code

Add these two lines to `app.js`, just place them anywhere before `app.listen()`:
```js
var IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
```

Then change `app.listen()` to:
```js
app.listen(PORT, IP_ADDRESS,() => {
  console.log(`Express server listening on port ${PORT} in ${app.settings.env} mode`);
});
```
Add this to `package.json`, after *name* and *version*. This is necessary because, by default, OpenShift looks for `server.js` file. And by specifying `supervisor app.js` it will automatically restart the server when node.js process crashes.

```js
"main": "app.js",
"scripts": {
  "start": "supervisor app.js"
},
```

- Finally, you can now push your code to OpenShift by running `git push -f openshift master`
 - **Note:** The first time you run this command, you have to pass `-f` (force) flag because OpenShift creates a dummy server with the welcome page when you create a new Node.js app. Passing `-f` flag will override everything with your *Hackathon Starter* project repository. **Do not** run `git pull` as it will create unnecessary merge conflicts.
- And you are done!

<img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Windows_Azure_logo.png" width="200">

- Login to [Windows Azure Management Portal](https://manage.windowsazure.com/)
- Click the **+ NEW** button on the bottom left of the portal
- Click **COMPUTE**, then **WEB APP**, then **QUICK CREATE**
- Enter a name for **URL** and select the datacenter **REGION** for your web site
- Click on **CREATE WEB APP** button
- Once the web site status changes to *Running*, click on the name of the web site to access the Dashboard
- At the bottom right of the Quickstart page, select **Set up a deployment from source control**
- Select **Local Git repository** from the list, and then click the arrow
- To enable Git publishing, Azure will ask you to create a user name and password
- Once the Git repository is ready, you will be presented with a **GIT URL**
- Inside your *Hackathon Starter* directory, run `git remote add azure [Azure Git URL]`
- To push your changes simply run `git push azure master`
 - **Note:** *You will be prompted for the password you created earlier*
- On **Deployments** tab of your Windows Azure Web App, you will see the deployment history

<img src="http://www.comparethecloud.net/wp-content/uploads/2014/06/ibm-bluemix_pr-030514.jpg" width="200">

- Go to [Codename: Bluemix](http://bluemix.net) to signup for the free trial, or login with your *IBM id*
- Install [Cloud Foundry CLI](https://github.com/cloudfoundry/cli)
- Navigate to your **hackathon-starter** directory and then run `cf push [your-app-name] -m 512m` command to deploy the application
 - **Note:** You must specify a unique application name in place of `[your-app-name]`
- Run `cf create-service mongodb 100 [your-service-name]` to create a [MongoDB service](https://www.ng.bluemix.net/docs/#services/MongoDB/index.html#MongoDB)
- Run `cf bind-service [your-app-name] [your-service-name]` to associate your application with a service created above
- Run `cf files [your-app-name] logs/env.log` to see the *environment variables created for MongoDB.
- Copy the **MongoDB URI** that should look something like the following: `mongodb://68638358-a3c6-42a1-bae9-645b607d55e8:46fb97e6-5ce7-4146-9a5d-d623c64ff1fe@192.155.243.23:10123/db`
- Then set it as an environment variable for your application by running `cf set-env [your-app-name] MONGODB [your-mongodb-uri]`
- Run `cf restart [your-app-name]` for the changes to take effect.
- Visit your starter app at **http://[your-app-name].ng.bluemix.net**
- Done!

**Note:** Alternative directions, including how to setup the project with a DevOps pipeline are available at [http://ibm.biz/hackstart](http://ibm.biz/hackstart).
A longer version of these instructions with screenshots is available at [http://ibm.biz/hackstart2](http://ibm.biz/hackstart2).
Also, be sure to check out the [Jump-start your hackathon efforts with DevOps Services and Bluemix](https://www.youtube.com/watch?v=twvyqRnutss) video.

<img src="https://www.digitalocean.com/assets/images/logos-badges/png/DO_Logo_Vertical_Blue-2c654e19.png" width="200">

### TODO

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

Sites Built with Mega Boilerplate
---------------------------------

If you have built something using Mega Boilerplate, please enter yourself here by sending a pull request.

Changelog
---------

### 1.0.0 (June 7, 2016)
- Initial release.

Contributing
------------

Pull requests from beginners and seasoned JavaScript developers are welcome! Mega Boilerplate is already pretty large in scope to be maintained just by one person, so I am asking for your help to contribute where you can, be it a small fix in README or adding a whole new generator type, e.g. Meteor, React Native, Electron.

If you are making changes to the website, run `npm run build` and check in updated version of *bundle.js* into the repository. 

:top: <sub>[**back to top**](#table-of-contents)</sub>

License
-------

MIT
