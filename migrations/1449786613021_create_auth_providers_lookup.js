exports.up = function(pgm) {
    pgm.createTable(
        'auth_providers_lookup', {
            id: {
                type: 'serial',
                primaryKey: true
            },
            name: {
                type: 'VARCHAR(255)',
                unique: true,
                notNull: true
            }
        });

    pgm.sql( 'insert into auth_providers_lookup (name) VALUES (\'google\')' );
    pgm.sql( 'insert into auth_providers_lookup (name) VALUES (\'facebook\')' );
};

exports.down = function(pgm) {
    pgm.dropTable('auth_providers_lookup');
};
