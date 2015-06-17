[![Stories in Ready](https://badge.waffle.io/adeperio/base.png?label=ready&title=Ready)](https://waffle.io/adeperio/base) [![Stories in Progress](https://badge.waffle.io/adeperio/base.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/adeperio/base)[![Security Backlog](https://badge.waffle.io/adeperio/base.svg?label=security&title=security)](http://waffle.io/adeperio/base)[![Backlog](https://badge.waffle.io/adeperio/base.svg?label=backlog&title=backlog)](http://waffle.io/adeperio/base)

# Base
![Alt text](/logo.png?raw=true "Base")

This is a seed / scaffolding project for a web application stack with OAuth2.

Built with ReactJS, Flux, Express, and Postgres.

Base aims to scaffold out a modern web application stack, with industry standard OAuth2 user access functionality and API security, right out of the box. So you can spend more time on what matters most - building, designing and hacking out your apps.

## Why

#### A starter kit and reference implementation for Facebook's ReactJS+Flux.
We love React+Flux and think you will to. Base scaffolds out React components along with related Flux actions and stores, and provides a starter framework for getting a ReactJS front-end chatting with an Express / Postgres back-end.

#### Secure web application stack using OAuth2.
We wanted a starter kit that scaffolds out a standard implementation of a modern secure web application.

##### Authentication and Sign-In
The aim is to provide a reference implementation for how to setup an OAuth2 sign-in flow, using authorization grant types, Bearer tokens, and social logins (Google, Twitter, and Facebook) for web apps, so that developers can get started quickly with a secure default configuration right out of the box.

##### API and web app security
Beyond authentication we are also aiming to provide levels of security in protecting all areas of the application stack and API. Features such as scopes, 2 Factor auth, XSS and SQL injection filters, SSL checks etc are all being documented and placed on the roadmap. We are also hoping that by open sourcing our security implementation, we are able to invite others to help us find and plug security related issues as they arise.

##### No silver bullet
> Software security is hard, and application security happens at all stages of development.
> But we'd like to give developers a solid start. Base aims to be a reference and provide a starting level of security for common protections and implementations for your web app.

#### Express / Node
We are trying to continue to make technology choices that support a balance of functionality, with light, powerful and un-opinionated implementations. We think ReactJS has been great for this, and we try to continue this trend through to Express and NodeJS. Express and NodeJS provides a powerful and scalable web stack as a base, but we hope enough flexibility and freedom to use and integrate other web frameworks as preferred on top (e.g Backbone etc).

#### An RDBMS Alternative
MongoDB is a very popular persistent store on the web, and with many good reasons. But we thnk there are many apps out there where an RDBMs is still the most relevant choice. We chose Postgres as a fast, scalable, open source, and well supported RDBMS option.

## Features

Base runs with:

Gulp + Webpack + React + Flux + Express + Postgres + Passportjs + Bootstrap + Jade + Mocha + Chai.

1. Out of the box OAuth2 implementation.
2. Sign-in, Sign-up, and Sign-out.
3. API endpoint protection using Oauth2 bearer tokens.
4. Sign in with Google, Facebook Twitter, or Local logins
5. React+Flux Scaffolding
6. React-router
7. WebPack+Gulp Build system
8. Postgres persistent layer
9. NodeJS Express web server  

## Installation

Base uses Gulp + Webpack as it's build system. To install base for your app:

```shell
$ git clone https://git@github.com:adeperio/base.git MyApp
$ cd MyApp
$ npm install -g gulp           # Install Gulp task runner globally
$ npm install                   # Install Node.js components listed in ./package.json
```

### Config

There is a config.sample.js file in the src/server directory. Before running the server, create a config.js file from this sample file and enter your OAuth2 sign in credentials from your auth provider (clientID, clientSecret, callbackURL).

### Database

You will also need to ensure that you have a running instance of Postgresql and correctly bootstrapped with the correct database tables. The connection string for the DB should be entered in your config.js file (e.g. postgres://postgres:postgres@localhost:5432/base).

To bootstrap the database, simply run:

```shell
$ gulp bootstrap
```

To run the application, run:

```shell
$ gulp
```

### Tests

Base has a suite of tests that runs against a test database. To run the tests, you will need to make sure you have a running instance of a test Postgres db (e.g. postgres://postgres:postgres@localhost:5432/base-test). The settings for this can be entered under the "TEST" NODE_ENV section of the config.js file.

Base uses Mocha + Chai as its test framework.

Once this is setup, run the tests by:

```shell
$ gulp test
```
