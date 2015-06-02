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
    if(this.context.router){

      AuthActions.setAccessToken(getAccessToken());
    }
  },

  render: function() {


    return (
      <div className={'home'}>
          <div className="home-box">
              <h1>Welcome to your Base</h1>
              <img src="/logo.png" />
          </div>
      </div>
    );

  }
});
