Mega Boilerplate
==================

Table of Contents
-----------------

- [Getting Started](#getting-started)
 - [Express](#express)
 - [Hapi](#hapi)
 - [Meteor](#meteor)
- [Database Setup](#database-setup)
 - [MongoDB](#)
 - [MySQL](#)
 - [PostgreSQL](#)
 - [SQLite](#)
- [Obtaining API Keys](#)
 - [Facebook](#)
 - [Twitter](#)
 - [Google](#)
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

![](https://dl.dropboxusercontent.com/u/14131013/npm-install.png)

:top: <sub>[**back to top**](#table-of-contents)</sub>

### Hapi

coming soon

### Meteor

## Database Setup

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
![](https://dl.dropboxusercontent.com/u/14131013/mongodb-data-db.png)
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


coming soon
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
