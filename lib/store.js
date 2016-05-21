'use strict';

var _redux = require('redux');

// 纯粹是为了获得dispatch

var dispatch = null;
var _createStore = function _createStore(reducer, initialState, enhancer) {
    var store = (0, _redux.createStore)(reducer, initialState, enhancer);
    dispatch = store.dispatch;
    return store;
};

module.exports = {
    getDispatch: function getDispatch() {
        return dispatch;
    },
    createStore: _createStore
};