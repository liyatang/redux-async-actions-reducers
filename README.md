# redux-async-actions-reducers
（有疑问先issue沟通）
redux 可以通过combineReducers把reducer拆分， actions也可以放在不同的文件上定义。

但按需加载貌似不行。 于是造了个

# demo
(未完成)
```
git clone https://github.com/liyatang/redux-async-actions-reducers.git
git checkout gh-pages
npm install
npm start
```

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

// map 进来
mapActions({
    something(){}
});
```

## 按需加载 reducers

以前
```javascript
import {combineReducers} from 'redux';

// ...省略

const rootReducers = combineReducers(reducers);
```

now
```javascript
import {combineAsyncReducers} from 'redux-async-actions-reducers';

// ...省略

// reducers 的初始状态需要在这里定义。 combineAsyncReducers 接管 reducers 后会转换成function.
// 每个reducers的state初始状态请在这里定义. 因为一开始redux会跑一个@INIT的action,把所有state初始化一遍。
let reducers = {
    a: {},
    b: {}
}

const rootReducers = combineAsyncReducers(reducers);
```

把 combineReducers 切换 combineAsyncReducers。 这样 reducers 被 redux-async-actions-reducers 接管，就可以通过 mapReducers 来按需加载 reducers 了。

```javascript
// 某A业务的reducers按需加载进来
import {mapReducers} from 'redux-async-actions-reducers';

mapReducers({
    something(state, action){
        switch (action.type) {
          // ... 省略
        }
    }
});
```
