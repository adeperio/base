[![Stories in Ready](https://badge.waffle.io/adeperio/base.png?label=ready&title=Ready)](https://waffle.io/adeperio/base) [![Stories in Progress](https://badge.waffle.io/adeperio/base.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/adeperio/base)

# Base
![Alt text](/logo.png?raw=true "Base")


This is a seed / scaffolding project for a full front-end / back-end web application stack with OAuth2. Built with ReactJS, Flux, Express, and Postgres.

## Why

Base aims to scaffold out a modern web application stack, with industry standard OAuth2 user access functionality and API security, right out of the box. So you can spend more time on what matters most - building, designing and hacking out your apps.

1. Oauth2 and secure API access (bearer tokens) can be complicated and time consuming to implement. Using PassportJS we provide the scaffolding needed for common Oauth2 sign in flows.
2. We love React+Flux and think you will to. Base scaffolds out React components along with related Flux actions and stores, and provides a starter framework for getting a ReactJS front-end chatting with an Express / Postgres back-end.

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

## Security

Base uses Oauth2 as it's authentication framework, and specifically the authorization grant type. It leverages http://passportjs.org to provide authentication strategies to popular social authentication providers, and also to provide api end point protection using token bearer strategies.

### SSL Checks - Coming up...
In order to adhere to the OAuth2 spec, SSL and correct SSL error handling needs to be implemented.

The SSL approach on this project will be an evolving discussion an dopen to critique. The goals here are to provide an appropriate implementation of SSL out of the box for developers that is

1. Takes into account running environments.
2. Provides a good balance between security and ease of setup and useability.
3. Where appropriate provide documentation on recommendations for developers to setup.

Currently the approach we are taking (again open for critique):

1. In NODE_ENV=production - TLS in production environments should be terminated at the load balancer level.
2. In NODE_ENV=production - We enforce an SSL connection and disallow requests from http (see https://github.com/adeperio/base/issues/13)
3. In NODE_ENV=development - Base runs on http in development


The RFC is a pretty hefty, but detailed resource if you want to go in depth into the requirements for the correct implementation of OAuth2 - https://tools.ietf.org/html/rfc6749

## JS Coding Conventions

There's plently of coding standards out there for JS. The following is what we try to adhere to in Base. The aim throughout the repo was to be consistent in its application.

1. File names use lowercase and hyphens
2. Class definitions are capitalised
3. Method, instance and variable names use lower camel case.


## Acknowledgements

Forked from some great work at https://github.com/kriasoft/react-starter-kit.
