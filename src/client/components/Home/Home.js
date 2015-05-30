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
        <div className="home row container-full no-pad">
            <div className="col-md-2 container-full">

            </div>
            <div className="col-md-7 container-full">
              <h1>Welcome</h1>
            </div>
            <div className="col-md-3 container-full">

            </div>
        </div>
    );

  }
});
