var pg = require('pg');
var config = new require('../config.js')();

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

//pull from provider lookup class
var insertGoogleProvider = 'insert into auth_providers_lookup (name) VALUES (\'google\')';
var insertFacebookProvider = 'insert into auth_providers_lookup (name) VALUES (\'facebook\')';

var dropAuthProvidersLookup = 'DROP TABLE IF EXISTS auth_providers_lookup';
var dropUsers = 'DROP TABLE IF EXISTS users';

//execute data bootstrap

//drop tables
client.query(dropUsers);
client.query(dropAuthProvidersLookup);

//create and bootstrap tables
client.query(createAuthProvidersLookup);
client.query(createUsers);
client.query(usersIndex);

client.query(insertGoogleProvider);
client.query(insertFacebookProvider)
  .on('end', function() {
    client.end();
  });
