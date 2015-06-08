# Base
![Alt text](/logo.png?raw=true "Base")
## A starter kit / hack stack on React, Flux, Express, and Postgres

Forked from some great stuff at https://github.com/kriasoft/react-starter-kit. We are extending this implementation to a full front-end back-end working stack with OAuth2

Gulp+Webpack+React+Flux+Express+Postgres+Passportjs+Bootstrap

## Features

1. OAuth Implementation
2. React+Flux Scaffolding
3. WebPack+Gulp Build system
4. Postgres persistent layer
5. Node Express web server

## Installation

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

Once this is setup, run the tests by:

```shell
$ gulp test
```

## OAuth2

Base uses Oauth2 as it's authentication framework, and specifically the authorization grant type. It leverages http://passportjs.org to provide authentication strategies to popular social authentication providers, and also to provide api end point protection using token bearer strategies.

In order to adhere to the OAuth2 spec,

> YOU MUST RUN YOUR APP OVER SSL.

This is to ensure that protected assets stay protected while in transit. The relevant SSL checks and verifications also need to be in place in order to adhere to the OAuth2 spec. The RFC is a pretty hefty, but detailed resource if you want to go in depth into the requirements for the correct implementation of OAuth2 - https://tools.ietf.org/html/rfc6749
