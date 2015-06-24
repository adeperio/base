'use strict'

import User from './user.js';

function Item() {

  this._id = '';
  this.user = new User();
  this.title = '';
  this.description = '';
  this.created = null;
}

module.exports = Item;
