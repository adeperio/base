'use strict';
import './user-items.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserItemStore from '../../flux/stores/user-item-store';
import UserItemsActions from '../../flux/actions/user-items-actions';
import ActionTypes from '../../flux/constants/action-types';

export default React.createClass({

  getInitialState: function() {
    return {
      items: []
    };
  },

  componentDidMount: function() {

    UserItemStore.on(ActionTypes.GET_USER_ITEMS_RES, this.refreshItems);
    UserItemStore.on(ActionTypes.ADD_ITEM_RES, this.refreshItems);
    UserItemsActions.getUserItems();
  },

  refreshItems: function(){
    this.setState({
      items:UserItemStore.getUserItems()
    });
  },

  addItem: function(){
    UserItemsActions.addItem('test1', 'description');
  },

  renderItems: function(){

    var items = <div></div>;

    if(this.state.items){
      items = this.state.items.map(function (item) {
            return (
              <div className="item">
                <h1>Items Title 1</h1>
                <p>Description</p>
              </div>
            );
          });
    }

    return (
      <div className="items">
        {items}
      </div>
    );
  },

  render: function() {

    var items = this.renderItems();

    return (
      <div className="user-items">
        <div className="row">
          <div className="col-md-2 col-md-offset-10">
            <Bootstrap.Button className="btn-primary" onClick={this.addItem}>
              Add Item
            </Bootstrap.Button>
          </div>
        </div>
        <div className="row">
          {items}
        </div>



      </div>
    );

  }
});
