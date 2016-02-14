exports.up = function(pgm) {
    pgm.createTable(
        'items', {
            id: {
                type: 'serial',
                primaryKey: true
            },
            user_id_fkey: {
                type: 'integer',
                notNull: true,
                references: 'users(id)'
            },
            title: {
                type: 'VARCHAR(255)',
                notNull: false
            },
            description: {
                type: 'VARCHAR(255)',
                notNull: false
            },
            created: {
                type: 'timestamp',
                default: pgm.func('current_timestamp')
            }
        });
};


exports.down = function(pgm) {
    pgm.dropTable('items');
};
