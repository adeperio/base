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

But we'd like to give developers a solid start. Base aims to be a reference and provide a starting level of security for common protections and implementations for your web app.

#### Express / Node
Express and NodeJS provides a powerful and scalable web stack as a base, but we hope enough flexibility and freedom to use and integrate other web frameworks as preferred on top (e.g Backbone etc).

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
