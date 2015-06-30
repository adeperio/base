[![Stories in Ready](https://badge.waffle.io/adeperio/base.png?label=ready&title=Ready)](https://waffle.io/adeperio/base) [![Stories in Progress](https://badge.waffle.io/adeperio/base.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/adeperio/base)[![Security Backlog](https://badge.waffle.io/adeperio/base.svg?label=security&title=security)](http://waffle.io/adeperio/base)[![Backlog](https://badge.waffle.io/adeperio/base.svg?label=backlog&title=backlog)](http://waffle.io/adeperio/base)

# Base
![Alt text](/logo.png?raw=true "Base")

Base is a seed / starter kit for a modern web application stack, scaffolded out with a baseline level of security. Built with ReactJS, Flux, Express, and Postgres.

## Why

##### A starter kit and reference implementation for Facebook's ReactJS+Flux.
We love React+Flux and think you will to. Base scaffolds out React components along with related Flux actions and stores, and provides a starter framework for getting a ReactJS front-end chatting with an Express / Postgres back-end.

##### Secure web application stack using OAuth2.
We wanted a starter kit that scaffolds out a baseline implementation of a modern secure web application.

##### A light and scalabale Web Server
Express and NodeJS provides a powerful and scalable web stack as a base. Other than this, we don't impose any other framework choice on the server side.

##### An RDBMS Alternative
MongoDB is a very popular persistent store on the web, and with many good reasons. But we thnk there are many apps out there where an RDBMs is still the most relevant choice. We chose Postgres as a fast, scalable, open source, and well supported RDBMS option.

## Features

The Stack:

Gulp + Webpack + React + Flux + Express + Postgres + Passportjs + Bootstrap + Jade + Mocha + Chai.

1. React+Flux Scaffolding
2. React-router
3. WebPack+Gulp
4. Postgres
5. NodeJS Express web server  

Security:

1. PassportJS for OAuth2
2. Social logins (Google and Facebook)
3. HelmetJS for header protection mechanisms
4. TLS/SSL By default
5. XSS protections
6. CSRF protections
7. Secure sessions

## Installation

### Requirements

#### A working instance of Postgres
The latest version of Postgresql can be found here: http://www.postgresql.org/download/
In addition to the regular DB used by Base, if you'd like to run the tests, you will also need to setup another database specifically for running the tests and ensure your test.env file points to it correctly.

> Tests in Base bootstraps the database, which means it will clear it out before a test run, so make sure that it does not point to any other DB instance that you care about

#### OAuth2 Setup - Google and Facebook apps

To sign-in using login with Google and Facebook, you will need to setup your app for OAuth with each provider.

##### Google

Google apps can be setup at console.developers.google.com. In order to use get user information from Google sign-in, we need the following scopes enabled for your application:

* https://www.googleapis.com/auth/plus.login
* https://www.googleapis.com/auth/userinfo.email
* https://www.googleapis.com/auth/userinfo.profile

##### Facebook

Facebook apps can be setup for OAuth2 at https://developers.facebook.com/. Facebook Oauth also needs the following scopes enabled:

* email
* public_profile


##### Hosts File Setup

> Google and Facebook requires that the callback URI for your app actually goes to a live address. If running your app on localhost (i.e. NODE_ENV=development), OAuth providers will need a way to call back in your app. The easiest way to do this would be to edit your HOSTS file on your computer. On a Mac, type the following in the terminal to edit your file

```shell
vi /etc/hosts
```
and in that file add the following line:

```shell
127.0.0.1 myapp.com
```

When specifiying the callback URI's in your Google or Facebook developer consoles, make sure that domain name matches whats listed. In your oauth provider developer consoles, you can also add multiple callback URIs. This is useful if you have instances of Base on multiple environments and ports (i.e. Base runs on port 3000 when in development, so the callback URI for base is https://basestackjs.com:3000/auth/facebook/callback for the facebook provider URI value).

> Also make sure that the callback URI exists as a route in your app. The default routes for the callback URI in Base are
> https://myapp.com/auth/facebook/callback
> https://myapp.com/auth/google/callback

##### Other providers
Base OAuth is built on top of PassportJS functionality, and so other OAuth providers can be added via Passport strategies. More providers are likely to appear on the Base roadmap. Check out http://passportjs.org/ for more info.

### Setup

#### Clone

Base uses Gulp + Webpack as it's build system. To install base for your app:

```shell
$ git clone https://git@github.com:adeperio/base.git MyApp
$ cd MyApp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```
### Setting your configs

Configs are stores in .env files that correspond to the running NODE_ENV value. So if you're running in production, Base will look for production.env config in the root directory of your project.

Config is loaded into your app using dotenv, and can then be accessed throughout your app using config.js

By default .env files are in .gitignore to avoid checking in secrets and settings, so you will need to manually create .env files in your repository.

There is however a sample.env file (not used by Base, and excluded from git ignore) that exists with an example list of settings that Base recognizes and supports. You can use this as a starting point to fill out your config settings. Copy this file and rename the copies to development.env, test.env, production.env etc for each NODE_ENV you have.

> NEVER check in your configs to repositories. Secrets, credentials and other sensitive settings generally exist in these files
> so we need to make sure these are kept out of VCS.

#### Bootstrap

Once you clone the repo, install the dependencies, and set your configs, you will need to bootstrap the database with the initial tables.

To bootstrap a NEW database, simply run:

```shell
$ gulp bootstrap
```
> BE CAREFUL to run this on any existing DB instance and this will wipe and reset the database to initial Base settings. This includes wiping all data, tables, and schemas

#### Self-sign Development certs

> On all environments other than test, Base runs on TLS/SSL by default! On production, a commercial certificate should be used, but in development and running locally, we have the option of using self signed certs.

To generate a self signed cert, run the following script:

```shell
$ ./make-self-signed-certs.sh myapp.com
```
This will generate all of the necessary certificates and keys in a folder called certs. Edit your config file and make sure that the correct location for the private key, certificate, and CA file are correctly specified.

In the sample.env file, the TLS.KEY, TLS.CERT, and TLS.CA settings have default values for SSL used for development, so it's safe to copy these over to development.env.


### Running Base
And finally, to run the application, type:

```shell
$ gulp
```

### Tests

Base uses Mocha + Chai as its test framework.

Base has a suite of tests that runs against a test database. To run the tests, you will need to make sure you have a running instance of a test Postgres db (e.g. postgres://postgres:postgres@localhost:5432/base-test). The settings for your test environment can be entered in your test.env config file. NODE_ENV=test uses only a small number of settings that are present in other environments, for example, the Oauth login settings aren't relevant for test runs.

> More test coverage coming, an ongoing task...

Once this is setup, run the tests by:

```shell
$ gulp test
```

### Production Build

Base can build out a production distribution in a dist folder. To build out a version for distribution type:

```shell
gulp build:dist --release
```

This will copy over a production.env file into the dist folder, whilst keeping our any self-signed certs generated. SFTP the contents of this folder to your VPS and run npm install to install all of the dependencies. After this, you can point ForeverJS (or PM2) to your server.js file on your dist folder on your production server to run the app.

> On the roadmap, Yeoman generators, and Heroku deploys
