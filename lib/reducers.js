'use strict';

var _redux = require('redux');

var _reducers = {};

/**
 * reducers能够通过combineReducers进行拆分，且combineReducers会map一遍，没有明显按需加载方案。
 *
 * reducers本身是function，很容易扩展。
 * 加多一层中间层，初始返回state的初始状态(一开始redux会run一遍),如果reducers通过mapReducers按需加载进来,则切换过去.
 *
 * 约定一个初始值，协助做初始化。
 *
 * @param {Function} reducers
 * @returns {Function} combineReducers
 * */
var combineAsyncReducers = function combineAsyncReducers(reducers) {
    _reducers = reducers;

    var o = {};
    Object.keys(_reducers).forEach(function (key) {
        if (toString.call(_reducers[key]) === '[object Function]') {
            o[key] = _reducers[key];
        } else {
            o[key] = function (state, action) {
                if (toString.call(_reducers[key]) === '[object Function]') {
                    return _reducers[key].call(null, state, action);
                }
                return state || _reducers[key];
            };
        }
    });

    return (0, _redux.combineReducers)(o);
};

var mapReducers = function mapReducers(reducers) {
    Object.assign(_reducers, reducers);
};

module.exports = {
    combineAsyncReducers: combineAsyncReducers,
    mapReducers: mapReducers
};