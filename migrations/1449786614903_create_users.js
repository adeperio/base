exports.up = function(pgm) {

    pgm.createTable(
        'users', {
            id: {
                type: 'serial',
                primaryKey: true
            },
            auth_provider_lookup_id_fkey: {
                type: 'integer',
                notNull: true,
                references: 'auth_providers_lookup(id)'
            },
            auth_provider_user_id: {
                type: 'VARCHAR(255)',
                notNull: true
            },
            email_address: {
                type: 'VARCHAR(255)',
                notNull: false
            },
            first_name: {
                type: 'VARCHAR(255)',
                notNull: false
            },
            last_name: {
                type: 'VARCHAR(255)',
                notNull: false
            },
            bio: {
                type: 'VARCHAR(1024)',
                notNull: false
            },
            created: {
                type: 'timestamp',
                default: pgm.func('current_timestamp')
            }
        });

    pgm.createIndex('users', ['email_address', 'auth_provider_user_id'], {
        name: 'email_providerid_idx',
        unique: true
    });
};

exports.down = function(pgm) {
    pgm.dropIndex('users', ['email_address', 'auth_provider_user_id'], {
        name: 'email_providerid_idx',
        unique: true
    });
    pgm.dropTable('users');
};
