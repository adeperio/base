'use strict'

import validator from 'validator';
import crypto from 'crypto';

function PasswordCrypto () {

  this.hashPassword = function(password, cb){
    crypto.pbkdf2(password, 'salt', 100000, 512, 'sha512', (err, key) => {
        if (err) throw err;
        cb(err, key);
    });
  };

  this.verifyPassword = function(){



  };

}

module.exports = PasswordCrypto;
