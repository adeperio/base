var pg = require('pg');
var config = new require('../../config.js')();

var client = new pg.Client(config.connectionString);
client.connect();

var createUsers = 'CREATE TABLE IF NOT EXISTS ' +
  'users(' +
    'id SERIAL PRIMARY KEY, ' +
    'email_address VARCHAR(255) UNIQUE not null)';

var createSessions = 'CREATE TABLE IF NOT EXISTS ' +
  'sessions(' +
    'id SERIAL PRIMARY KEY, ' +
    'user_id_fkey integer references users(id), ' +
    'email_address VARCHAR(255) not null, ' +
    'base_access_token VARCHAR(255) UNIQUE not null,' +
    'provider_access_token VARCHAR(255) UNIQUE not null,' +
    'created timestamp default current_timestamp)';

client.query(createUsers);
client.query(createSessions)
  .on('end', function() {
    client.end();
  });
