'use strict'

var pg = require('pg');
var config = new require('./config.js')();
var client = new pg.Client(config.connectionString);
client.connect();

var createUsers = 'CREATE TABLE IF NOT EXISTS ' +
  'users(' +
    'id SERIAL PRIMARY KEY, ' +
    'auth_provider_lookup_id_fkey integer not null references auth_providers_lookup(id), ' +
    'auth_provider_user_id VARCHAR(255) not null, ' + //user designation from auth proivder
    'email_address VARCHAR(255) null, ' +
    'first_name VARCHAR(255) null, ' +
    'last_name VARCHAR(255) null, ' +
    'bio VARCHAR(1024) null, ' +
    'created timestamp default current_timestamp)';

var usersIndex = 'CREATE UNIQUE INDEX email_providerid_idx ON users (email_address, auth_provider_user_id);';

var createAuthProvidersLookup = 'CREATE TABLE IF NOT EXISTS ' +
    'auth_providers_lookup(' +
    'id SERIAL PRIMARY KEY, ' +
    'name VARCHAR(255) UNIQUE not null)'; //ie google, twitter, facebook

var createItemsTable = 'CREATE TABLE IF NOT EXISTS ' +
        'items(' +
        'id SERIAL PRIMARY KEY, ' +
        'user_id_fkey integer not null references users(id), ' +
        'title VARCHAR(255) null, ' +
        'description VARCHAR(255) null, ' +
        'created timestamp default current_timestamp)';

//** Note this session table script follow the format as defined at https://github.com/voxpelli/node-connect-pg-simple/blob/master/table.sql
//   The node-connect-pg-simple module uses this to persist sessions to our Postgres Database
//      Postgres as the session store was used for Base as a
//      convenient (insofar as not needing developers to go through the setup of another DB)
//      and fast option for session storage
//   Other options such as Redis may present faster alternatives...
var createSessionTable = 'CREATE TABLE \"session\" ( ' +
  '  \"sid\" varchar NOT NULL COLLATE \"default\", ' +
  '  \"sess\" json NOT NULL, ' +
  '  \"expire\" timestamp(6) NOT NULL ' +
') ' +
'WITH (OIDS=FALSE); ' +
'ALTER TABLE \"session\" ADD CONSTRAINT \"session_pkey\" PRIMARY KEY (\"sid\") NOT DEFERRABLE INITIALLY IMMEDIATE;';

//pull from provider lookup class
var insertGoogleProvider = 'insert into auth_providers_lookup (name) VALUES (\'google\')';
var insertFacebookProvider = 'insert into auth_providers_lookup (name) VALUES (\'facebook\')';

var dropAuthProvidersLookup = 'DROP TABLE IF EXISTS auth_providers_lookup';
var dropUsers = 'DROP TABLE IF EXISTS users';
var dropSession = 'DROP TABLE IF EXISTS session';
var dropItems = 'DROP TABLE IF EXISTS items';


//execute data bootstrap

//drop tables
client.query(dropItems);
client.query(dropUsers);
client.query(dropAuthProvidersLookup);
client.query(dropSession);


//create and bootstrap tables
client.query(createAuthProvidersLookup);
client.query(createUsers);
client.query(usersIndex);
client.query(createItemsTable);
client.query(createSessionTable);

client.query(insertGoogleProvider);
client.query(insertFacebookProvider)
  .on('end', function() {
    client.end();
  });
