'use strict';

import React from 'react';
import Router from 'react-router';
import routes from './routes.js';
import SessionStore from './session-store.js';

window.sessionStoreGlobal = new SessionStore();

function run() {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}

Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  })
])
.then(run);
