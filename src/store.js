import {createStore} from 'redux';

// 纯粹是为了获得dispatch

let dispatch = null;
const _createStore = (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);
    dispatch = store.dispatch;
    return store
}

module.exports = {
    getDispatch: () => dispatch,
    createStore: _createStore
};