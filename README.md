# redux-async-actions-reducers
demo还没有提供，有疑问先issue沟通

redux 可以通过combineReducers把reducer拆分， actions也可以放在不同的文件上定义。

但按需加载貌似不行。 于是造了个

# 用法

## 按需加载actions

以前
```javascript
import {bindActionCreators} from'redux';

// ...省略

App = connect(state => state, dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(App);
```

now
```javascript
import {bindAsyncActions} from 'redux-async-actions-reducers';

// ...省略

App = connect(state => state, dispatch => ({
    actions: bindAsyncActions(actions, dispatch)
}))(App);
```

把 bindActionCreators 切换成 bindAsyncActions。 这样 actions 被 redux-async-actions-reducers 接管，就可以通过 mapActions 来按需加载 actions 了。

```javascript
// 某A业务的 actions 按需加载进来
import {mapActions} from 'redux-async-actions-reducers';

let actions = {};

actions.something = () => {};

// map 进来
mapActions(actions);
```

## 按需加载 reducers

以前
```javascript
import {combineReducers} from 'redux';

// ...省略

const rootReducer = combineReducers(reducers);
```

now
```javascript
import {combineAsyncReducers} from 'redux-async-actions-reducers';

// ...省略

// reducers 的初始状态需要在这里定义。 combineAsyncReducers 接管 reducers 后会转换成function
let reducers = {
    a: {},
    b: {}
}

const rootReducer = combineAsyncReducers(reducers);
```

把 combineReducers 切换 combineAsyncReducers。 这样 reducers 被 redux-async-actions-reducers 接管，就可以通过 mapReducers 来按需加载 reducers 了。

```javascript
// 某A业务的reducers按需加载进来
import {mapReducers} from 'redux-async-actions-reducers';
let reducers = {};
reducers.something = (state, action) => {
    switch(action.type){
      // ... 省略
    }
};

mapReducers(reducers);
```
