'use strict';
import './Home.less';

import React from 'react';
import AuthActions from '../../Flux/actions/AuthActions';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: { },

  componentDidMount: function() {
  },

  render: function() {


    return (
      <div className={'signup'}>
          <div className="signup">
              <h1>Looks like this is your first time, sign yourself up!</h1>
              <img src="/logo.png" />
          </div>
      </div>
    );

  }
});
