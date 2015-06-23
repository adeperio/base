'use strict'

module.exports = function(){

  switch(process.env.NODE_ENV){

    case 'development':
        return {
          connectionString: 'postgres://postgres:postgres@localhost:5432/base',
          tls: {
            key: '',
            certificate: ''
          },
          auth: {
            google: {
              clientID: '',
              clientSecret: '',
              callbackURL: ''
            },
            facebook: {
              clientID: '',
              clientSecret: '',
              callbackURL: ''
            }
          },
          token: {
            timeToLiveInMilliseconds:7200000
          }
        };

    case 'test':
            return {
              connectionString: 'postgres://postgres:postgres@localhost:5432/base-test',
              tls: {
                key: '',
                certificate: ''
              },
              auth: {
                google: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                },
                facebook: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                }
              },
              token: {
                timeToLiveInMilliseconds:7200000
              }
            };

        case 'production':
            return {
              connectionString: 'postgres://postgres:postgres@productionhost.com:5432/base',
              tls: {
                key: '',
                certificate: ''
              },
              auth: {
                google: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                },
                facebook: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                }
              },
              token: {
                timeToLiveInMilliseconds:7200000
              }
            };

        default:
            return {
              connectionString: 'postgres://postgres:postgres@localhost:5432/base',
              tls: {
                key: '',
                certificate: ''
              },
              auth: {
                google: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                },
                facebook: {
                  clientID: '',
                  clientSecret: '',
                  callbackURL: ''
                }
              },
              token: {
                timeToLiveInMilliseconds:7200000
              }
            };
    }

};
