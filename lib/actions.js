/**
 * 背景:
 * bindActionCreators 会把 actions对象map一遍，此时action是什么就什么，无法添加新的actions，so 按业务按需加载actions就无法实现。
 * 于是参考bindActionCreators写一个
 * */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var asyncActions = {};
var _dispatch = function _dispatch() {
};

/**
 * 从这里拿到dispatch。存起来，备用。(还可以什么地方拿到？)
 * 参考bindActionCreators。
 * @param {Object} actions
 * @param {Function} dispatch
 * @returns {Object} asyncActions
 */
var bindAsyncActions = function bindAsyncActions(actions, dispatch) {
    _dispatch = dispatch;
    Object.keys(actions).forEach(function (key) {
        asyncActions[key] = function () {
            return _dispatch(actions[key].apply(actions, arguments));
        };
    });
    return asyncActions;
};

/**
 * 按需添加actions
 * @param {Object} actions
 * @returns {Object} asyncActions 暂时没有规划返回值怎么用
 */
var mapActions = function mapActions(actions) {
    Object.keys(actions).forEach(function (key) {
        asyncActions[key] = function () {
            return _dispatch(actions[key].apply(actions, arguments));
        };
    });
    return asyncActions;
};

exports.bindAsyncActions = bindAsyncActions;
exports.mapActions = mapActions;