import {combineReducers} from 'redux';

let _reducers = {};

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
let combineAsyncReducers = (reducers) => {
    _reducers = reducers;

    let o = {};
    Object.keys(_reducers).forEach((key) => {
        if (typeof _reducers[key] === 'function') {
            o[key] = _reducers[key];
        } else {
            o[key] = (state, action) => {
                if (typeof _reducers[key] === 'function') {
                    return _reducers[key].call(null, state, action);
                }
                return state || _reducers[key];
            };
        }
    });

    return combineReducers(o);
};

let mapReducers = (reducers) => {
    Object.assign(_reducers, reducers);
};

module.exports = {
    combineAsyncReducers,
    mapReducers
};