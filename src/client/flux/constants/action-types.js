'use strict';

import keyMirror from 'react/lib/keyMirror';

var ActionTypes = keyMirror({

  LOAD_PAGE: null,
  LOAD_PAGE_COMPLETED: null,
  CHANGE_LOCATION: null,

  //Auth
  SIGNOUT_RES: null,
  SIGNOUT_ERR: null,
  SIGNUP_RES: null,
  SIGNUP_ERR: null,

  //User
  ME_RES: null,
  ME_ERR: null

});

module.exports = ActionTypes;
