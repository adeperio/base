'use strict'

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {
                connectionString: 'postgres://postgres:postgres@localhost:5432/base'
            };

        case 'production':
            return {
                connectionString: 'postgres://postgres:postgres@localhost:5432/base'
            };

        default:
            return {
                connectionString: 'postgres://postgres:postgres@localhost:5432/base'
            };
    }
};
