import {combineReducers} from 'redux';
import {getDispatch} from './store';
let newReducers = {};
const INIT = '@@REDUX_ASYNC_ACTIONS_REDUCERS/INIT';

/**
 * reducers能够通过combineReducers进行拆分，且combineReducers会map一遍，没有明显按需加载方案。
 *
 * reducers本身是function，很容易扩展，加多一层中间层。
 *
 *
 * 初始返回state的初始状态(一开始redux会run一遍),如果reducers通过mapReducers按需加载进来,则切换过去.
 *
 * 约定一个初始值，协助做初始化。
 *
 * @param {Function} reducers
 * @returns {Function} combineReducers
 * */
let combineAsyncReducers = (reducers) => {
    newReducers = reducers;

    let o = {};
    Object.keys(newReducers).forEach((key) => {
        o[key] = (state, action) => {
            if (typeof newReducers[key] === 'function') {
                return newReducers[key].call(null, (state === null) ? undefined : state, action);
            }
            return state || newReducers[key];
        };
    });

    return combineReducers(o);
};

/**
 * reducers 异步加载进来后，并没有改变store啥。 需要触发一个action来初始化
 * 只异步加载第一级reducer，够用。 如果reducer里面还有子reducer，用combineReducers。
 * @param reducers
 */
let mapReducers = (reducers) => {
    Object.assign(newReducers, reducers);
    getDispatch()({type: INIT});
};

module.exports = {
    combineAsyncReducers,
    mapReducers
};