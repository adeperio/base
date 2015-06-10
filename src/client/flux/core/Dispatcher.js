
'use strict';

import Flux from 'flux';
import PayloadSources from '../constants/payload-sources';
import assign from 'react/lib/Object.assign';

/**
 * A singleton that operates as the central hub for application updates.
 * For more information visit https://facebook.github.io/flux/
 */
var Dispatcher = assign(new Flux.Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };
    console.log('DISPATCHING ' + JSON.stringify(action.actionType));
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    console.log('DISPATCHING ' + JSON.stringify(action.actionType));
    this.dispatch(payload);
  }

});

module.exports = Dispatcher;
