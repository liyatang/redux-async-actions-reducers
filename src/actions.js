/**
 * 背景:
 * bindActionCreators 会把 actions对象map一遍，此时action是什么就什么，无法添加新的actions，so 按业务按需加载actions就无法实现。
 * 于是参考bindActionCreators写一个
 * */

let asyncActions = {};
let dispatch = () => {
};

/**
 * 从这里拿到dispatch。存起来，备用。(还可以什么地方拿到？)
 * 参考bindActionCreators。
 * @param {Object} actions
 * @param {Function} dispatch
 * @returns {Object} asyncActions
 */
let bindAsyncActions = (actions, _dispatch) => {
    dispatch = _dispatch;
    Object.keys(actions).forEach((key) => {
        asyncActions[key] = (...args)=> {
            return dispatch(actions[key](...args));
        };
    });
    return asyncActions;
};

/**
 * 按需添加actions
 * @param {Object} actions
 * @returns {Object} asyncActions 暂时没有规划返回值怎么用
 */
let mapActions = (actions)=> {
    Object.keys(actions).forEach((key) => {
        asyncActions[key] = (...args) => {
            return dispatch(actions[key](...args));
        };
    });
    return asyncActions;
};

export {
    bindAsyncActions,
    mapActions
};