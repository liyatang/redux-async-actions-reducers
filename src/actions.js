const initActionType = '@@redux-async-actions-reducers/init';
let asyncActions = {};
let _dispatch = () => {
};

/*
 * 背景:
 * bindActionCreators 会把 actions对象map一遍,此时action是什么就什么,无法添加新的actions,so 按业务按需加载actions就无法事先.
 * 于是参考bindActionCreators写一个
 * */

/*
 * 从这里拿到dispatch.存起来,备用.(还可以什么地方拿到?)
 * 参考bindActionCreators.
 *
 * @param {Object}
 *
 * @returns {Object} 返回一个引用.以备后面按需加载actions
 * */
let bindAsyncActions = (actions, dispatch) => {
    _dispatch = dispatch;
    Object.keys(actions).forEach((key) => {
        asyncActions[key] = (...args)=> {
            return _dispatch(actions[key](...args));
        };
    });
    return asyncActions;
};

/*
 * 按需添加actions.
 *
 * @param {Object}
 *
 * @returns {Object} 没有规划怎么用
 * */
let mapActions = (actions)=> {
    Object.keys(actions).forEach((key) => {
        asyncActions[key] = (...args) => {
            return _dispatch(actions[key](...args));
        };
    });
    return asyncActions;
};

export {
    initActionType,
    bindAsyncActions,
    mapActions,
};