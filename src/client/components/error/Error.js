'use strict';
import './Error.less';
import React from 'react';
export default React.createClass({

  propTypes: { },


  render: function() {

    var homeUrl = '/';

    return (
      <div className={'error'}>
          <div className="error-box">
            <h1>These arent the droids you are looking for</h1>

            <a href={homeUrl}>Sign in with your email</a>
          </div>

      </div>
    );

  }
});
