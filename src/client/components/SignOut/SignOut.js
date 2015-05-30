'use strict';

import './SignOut.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';

import AuthStore from '../../Flux/stores/AuthStore';
import AuthActions from '../../Flux/actions/AuthActions';

export default React.createClass({

  propTypes: { },

  componentDidMount: function() { },

  onSignout: function(){

    AuthActions.revoke(AuthStore.getAccessToken());
  },

  render: function() {
    return (
      <div className={'signOut'}>
        <Bootstrap.Button onClick={this.onSignout}>
          Sign out
        </Bootstrap.Button>
      </div>
    );

  }
});
