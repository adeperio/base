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

};

exports.down = function(pgm) {
    pgm.dropTable('auth_providers_lookup');
};
