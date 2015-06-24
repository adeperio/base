'use strict'

import query from 'pg-query';
import mapper from './pg-data-mapper.js';
import validator from 'validator';

function ItemRepository () {

  query.connectionParameters = Config.connectionString;

  //this will Insert a user and return the new row or return an existing row based on the provider id
  this.createItem = function(userId, title, description){

      var sql = 'INSERT INTO items (user_id_fkey, title, description) VALUES ($1, $2, $3) RETURNING *';

      return query(sql, [userId, title, description])
                .then(function(result){
                    if(result && result[1] && result[1].rows && result[1].rows.length == 1){
                      return result[1].rows[0];
                    } else {
                      throw new Error('There was a problem creating the user');
                    }
                })
                .then(function(itemRow){
                  if(itemRow){
                    return mapper.mapToItemAsync(itemRow);
                  } else{
                    return null;
                  }
                });
  };

}

module.exports = ItemRepository;
