var pg = require('pg');
var config = new require('../../config.js')();

var client = new pg.Client(config.connectionString);
client.connect();

var createUsers = 'CREATE TABLE IF NOT EXISTS ' +
  'users(' +
    'id SERIAL PRIMARY KEY, ' +
    'auth_provider_lookup_id_fkey integer references auth_providers_lookup(id), ' +
    'auth_provider_user_id VARCHAR(255) not null, ' +//user designation from auth proivder
    'email_address VARCHAR(255) UNIQUE not null)';

var createAuthProvidersLookup = 'CREATE TABLE IF NOT EXISTS ' +
  'auth_providers_lookup(' +
    'id SERIAL PRIMARY KEY, ' +
    'type VARCHAR(255) UNIQUE not null)'; //ie google, twitter, facebook

var createSessions = 'CREATE TABLE IF NOT EXISTS ' +
  'sessions(' +
    'id SERIAL PRIMARY KEY, ' +
    'user_id_fkey integer references users(id), ' +
    'email_address VARCHAR(255) not null, ' +
    'base_access_token VARCHAR(255) UNIQUE not null,' +
    'provider_access_token VARCHAR(255) UNIQUE not null,' +
    'created timestamp default current_timestamp)';

var insertAuthProviders = 'insert into auth_providers_lookup (type) VALUES (\'google\')';

client.query(createUsers);
client.query(createAuthProviders);
client.query(insertAuthProviders);
client.query(createSessions)
  .on('end', function() {
    client.end();
  });
