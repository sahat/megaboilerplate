Mega Boilerplate
==================

Table of Contents
-----------------

- [Getting Started](#getting-started)
 - [Express](#express)
 - [Hapi](#hapi)
 - [Meteor](#meteor)
- [Database Setup](#database-setup)
 - [MongoDB](#-mongodb)
 - [MySQL](#-mysql)
 - [PostgreSQL](#-postgresql)
 - [SQLite](#-sqlite)
- [Obtaining API Keys](#obtaining-api-keys)
- [Cheatsheets](#cheatsheets)
 - [ES6](#-es6-cheatsheet)
 - [JavaScript Date](#-javascript-date-cheatsheet)
- [Deployment](#deployment)
- [FAQ](#)
- [Changelog](#)
- [Contributing](#)
- [License](#)

Getting Started
---------------

### Prerequisites

- [Node.js 4.0+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17"> **Mac OS X**: `xcode-select --install`
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17"> **Windows**: [Visual Studio Community 2015](https://www.visualstudio.com/products/visual-studio-community-vs)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17"> **Ubuntu**: `sudo apt-get install build-essential`
 - <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17"> **Fedora**: `sudo dnf groupinstall "Development Tools"`
 - <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17"> **OpenSUSE**: `sudo zypper install --type pattern devel_basis`

### Express

Download and extract the project. Then in your Terminal shell type the following:

```shell
$ cd myproject

# Install NPM dependencies
$ npm install

$ node app.js
```

**Note**: If you have selected a database, please make sure it is up and running. For additional information, see [**Database Setup**](#database-setup).

:top: <sub>[**back to top**](#table-of-contents)</sub>

### Hapi

coming soon

### Meteor

## Database Setup

- [MongoDB](#-mongodb)
- [MySQL](#-mysql)
- [PostgreSQL](#-postgresql)
- [SQLite](#-sqlite)

:top: <sub>[**back to top**](#table-of-contents)</sub>

### <img src="http://static.tumblr.com/lbtm3t2/8PAn0kziu/mongodb-logo.png" height="34" align="top"> MongoDB

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

### <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/640px-MySQL.svg.png" height="34" align="top"> MySQL

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

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/200px-Postgresql_elephant.svg.png" height="34" align="top"> PostgreSQL

Use database settings below in the `.env` file.

| Key           | Value                                                             |
| ------------- |:-----------------------------------------------------------------:|
| `DB_HOST`     | localhost                                                         |
| `DB_USER`     | postgres                                                              |
| `DB_PASSWORD` | (use root password configured during installation) |
| `DB_NAME`     | postgres                                                             |

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

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sqlite-square-icon.svg/240px-Sqlite-square-icon.svg.png" height="34" align="top"> SQLite

No additional steps required. Package [`sqlite3`](https://www.npmjs.com/package/sqlite3) will be automatically installed during `npm install` in [**Getting Started**](#getting-started).

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

<img src="https://g.twimg.com/ios_homescreen_icon.png" width="90">
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
Math.floor(Date.now() / 1000)
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
var ampm = hours >= 12 ? 'pm' : 'am';

hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;

console.log(hours + ':' + minutes + ' ' + ampm); // 1:43 am
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

License
-------

The MIT License (MIT)

Copyright (c) 2016 Sahat Yalkabov

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
