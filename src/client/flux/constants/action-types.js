'use strict';

import keyMirror from 'react/lib/keyMirror';

var ActionTypes = keyMirror({

  LOAD_PAGE: null,
  LOAD_PAGE_COMPLETED: null,
  CHANGE_LOCATION: null,

  //User
  ME_RES: null,
  ME_ERR: null,
  SIGNOUT_RES: null,
  SIGNOUT_ERR: null,
  SIGNUP_RES: null,
  SIGNUP_ERR: null,

  //User Items
  ADD_ITEM_RES: null,
  ADD_ITEM_ERR: null,
  GET_USER_ITEMS_RES: null,
  GET_USER_ITEMS_ERR: null

});

module.exports = ActionTypes;
