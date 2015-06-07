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

  //Email
  EMAIL_GET_NAMESPACES_REQ: null,
  EMAIL_GET_NAMESPACES_RES: null,
  EMAIL_TOGGLE_THREAD_EXPANDED: null,
  EMAIL_GET_THREADS_REQ: null,
  EMAIL_GET_THREADS_RES: null,
  EMAIL_GET_THREADS_RES_ERR: null,
  EMAIL_GET_MSGS_REQ: null,
  EMAIL_GET_MSGS_RES: null,
  EMAIL_GET_MSGS_RES_ERR: null,
  EMAIL_THREAD_UPDATE: null,
  EMAIL_THREAD_UPDATED: null,

  //Tasks
  TASK_CREATE: null,
  TASK_CREATED: null,
  TASK_DELETE: null,
  TASK_DELETED: null,
  TASK_UPDATE: null,
  TASK_UPDATED: null,
  TASK_DONE_UPDATE: null,
  TASK_DONE_UPDATED: null,
  TASK_TOGGLE_SELECT: null,
  TASK_TOGGLE_SELECTED: null,

  //Projects
  PROJECT_CREATE: null,
  PROJECT_CREATED: null,
  PROJECT_SELECT: null,
  PROJECT_SELECTED: null,

  //Timeline
  TIMELINE_UPDATED: null,

  //Notes
  NOTE_CREATE: null,
  NOTE_CREATED: null,
  NOTE_DELETE: null,
  NOTE_DELETED: null,
  NOTE_UPDATE: null,
  NOTE_UPDATED: null,
  NOTE_PROJECT_UPDATE: null,
  NOTE_PROJECT_UPDATED: null
});

module.exports = ActionTypes;
