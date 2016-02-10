[![Stories in Ready](https://badge.waffle.io/adeperio/base.png?label=ready&title=Ready)](https://waffle.io/adeperio/base) [![Stories in Progress](https://badge.waffle.io/adeperio/base.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/adeperio/base)[![Security Backlog](https://badge.waffle.io/adeperio/base.svg?label=security&title=security)](http://waffle.io/adeperio/base)[![Backlog](https://badge.waffle.io/adeperio/base.svg?label=backlog&title=backlog)](http://waffle.io/adeperio/base)

# Base
![Alt text](/logo.png?raw=true "Base")

Base is a seed / starter kit for a modern web application stack, scaffolded out with a baseline level of security. Built with ReactJS, Flux, Express, and Postgres.

#### Demo Site

View the demo at https://demo.basestackjs.com

#### Contribute

Check out the [contribute.md](contribute.md)

## Why

The philosophy around Base was to roll out a baseline set of security features for protection against common web application threats to give developers a kick start when building out their app.

We're not trying to be a silver bullet, but we are aiming to give developers as big a kick start as possible.

Some of the other why's include:

##### A starter kit and reference implementation for Facebook's ReactJS+Flux.
We love React+Flux and think you will too. Base scaffolds out React components along with related Flux actions and stores, and provides a starter framework for getting a ReactJS front-end chatting with an Express / Postgres back-end.

##### Secure web application stack using OAuth2.
We wanted a starter kit that scaffolds out a baseline implementation of a modern secure web application.

##### A light and scalable Web Server
Express and NodeJS provides a powerful and scalable web stack as a base. Other than this, we don't impose any other framework choice on the server side.

##### An RDBMS Alternative
MongoDB is a very popular persistent store on the web, and with many good reasons. But we think there are many apps out there where an RDBMs is still the most relevant choice. We chose Postgres as a fast, scalable, open source, and well supported RDBMS option.

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

* A running instance of PostgreSQL is required. The latest version of PostgreSQL can be found here: http://www.postgresql.org/download/. pgAdmin - the defacto admin platform for PostgreSQL can also be downloaded here: http://pgadmin.org/
* To prep Base for social logins, you will need to setup your app's OAuth details for respective providers - more details here [auth.md](docs/auth.md)

### Setup

Base uses Gulp + Webpack as it's build system. To install base for your app:

```shell
$ git clone https://git@github.com:adeperio/base.git MyApp
$ cd MyApp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```
#### Setting your configs

Configs are stores in `.env` files that correspond to the running `NODE_ENV` value.

So if you're running in production, Base will look for `production.env` config in the root directory of your project.

Config is loaded into your app using `dotenv`, and can then be accessed throughout your app using `config.js`

By default `.env` files are in `.gitignore` to avoid checking in secrets and settings, so you will need to manually create `.env` files in your repository.

> NEVER check in your configs to repositories. Secrets, credentials and other sensitive settings generally exist in these files
> so we need to make sure these are kept out of VCS.

There is however a `sample.env` file (not used by Base, and excluded from `.gitignore`) that exists with an example list of settings that Base recognizes and supports.

You can use `sample.env` as a starting point to fill out your config settings. Copy this file and rename the copies to `development.env`, `test.env`, `production.env` etc for each `NODE_ENV` you have.

#### Bootstrap

Once you clone the repo, install the dependencies, and set your configs, you will need to bootstrap the database with the initial tables.

To bootstrap a NEW database, simply run:

```shell
$ gulp bootstrap
```
> BE CAREFUL to run this on any existing DB instance and this will wipe and reset the database to initial Base settings. This includes wiping all data, tables, and schemas

The bootstrap script also creates self signed certs for use in development. In the `sample.env` file, the `TLS.KEY`, `TLS.CERT`, and `TLS.CA` settings have default values for SSL used for development, so it's safe to copy these over to `development.env`.

#### Running Base

* Check that you have a running instance of Postgres and that your DB is live.
* Make sure your port in your .env profile matches your running Postgres port
* Make sure that you have an empty DB already created. gulp bootstrap does not create a DB automatically, just the tables

then to run the application, type:

```shell
$ gulp
```

### Tests

Base has a suite of tests that runs against a test database. Mocha + Chai are used as the test frameworks.

To run the tests, you will need to make sure you have a running instance of a test Postgres DB.(e.g. postgres://postgres:postgres@localhost:5432/base-test).

The settings for your test environment can be entered in your `test.env` config file. `NODE_ENV=test` uses only a small number of settings that are present in other environments, for example, the Oauth login settings aren't relevant for test runs.

> More test coverage coming, an ongoing task...

Once this is setup, run the tests by:

```shell
$ gulp test
```

### Production Build

Base can build out a production distribution in a `dist` folder. To build out a version for distribution type:

```shell
gulp build:dist --release
```

This will copy over a `production.env` file into the `dist` folder, whilst keeping out any self-signed certs generated.

SFTP the contents of this folder to your VPS and run `npm install` to install all of the dependencies.

After this, you can point ForeverJS (or PM2) to your `server.js` file in your `dist` folder on your production server to run the app.

> On the roadmap, Yeoman generators, and Heroku deploys

### MIT
Base is under MIT license - [LICENSE.txt](LICENSE.txt)
