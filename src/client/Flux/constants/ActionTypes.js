'use strict';

import keyMirror from 'react/lib/keyMirror';

var ActionTypes = keyMirror({

  LOAD_PAGE: null,
  LOAD_PAGE_COMPLETED: null,
  CHANGE_LOCATION: null,

  //Auth
  SESSION_OBJECT_REC: null,
  SESSION_OBJECT_SET: null,
  REVOKE_RES: null,
  REVOKE_ERR: null,
  SIGNUP_RES: null,
  SIGNUP_ERR: null,

  //User
  ME_RES: null,
  ME_ERR: null

});

module.exports = ActionTypes;
