'use strict';

var _redux = require('redux');

var _reducers = {};

var initActionType = '@@redux-async-actions-reducers/init';
/*
 * 顶层store,且要求store要很清楚是什么和一开始的时候就定义好初始状态.(这普遍吧?)
 * reducers能够通过combineReducers进行拆分.没有明显按需加载方案.
 * 且combineReducers会map一遍，也需要定义好初始状态。
 *
 * so reducers本身是function,很容易扩展.
 * 加多一层中间层,初始返回state的初始状态(一开始redux会run一遍),如果reducers通过mapReducers按需加载进来,则切换过去.
 *
 * 约定一个初始值，协助做初始化。
 * 
 * @param {function}
 *
 * @returns combineReducers
 * */
var combineAsyncReducers = function combineAsyncReducers(reducers) {
    _reducers = reducers;

    var o = {};
    Object.keys(_reducers).forEach(function (key) {
        if (typeof _reducers[key] === 'function') {
            o[key] = _reducers[key];
        } else {
            (function () {
                // 是对象，先存起来
                var forInit = Object.assign({}, _reducers[key]);
                o[key] = function (state, action) {
                    if (action.type === initActionType) {
                        return forInit;
                    }
                    if (typeof _reducers[key] === 'function') {
                        return _reducers[key].call(null, state, action);
                    }
                    return state || _reducers[key];
                };
            })();
        }
    });

    return (0, _redux.combineReducers)(o);
};

var mapReducers = function mapReducers(reducers) {
    Object.assign(_reducers, reducers);
};

module.exports = {
    initActionType: initActionType,
    combineAsyncReducers: combineAsyncReducers,
    mapReducers: mapReducers
};