exports.up = function(pgm) {


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

  pgm.sql(createSessionTable);
};

exports.down = function(pgm) {
  pgm.dropTable('session');
};
