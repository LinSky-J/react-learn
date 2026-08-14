// ==========================================================
// Redux 快速体验 (纯 Redux 计数器原理)
// 不和任何框架绑定，不使用任何构建工具，使用纯 Redux 核心概念实现计数器
// 
// 严格按照教学 5 个标准步骤书写：
// 1. 定义一个 reducer 函数（根据当前想要做的修改返回一个新的状态）
// 2. 使用 createStore 方法传入 reducer 函数生成一个 store 实例对象
// 3. 使用 store 实例的 subscribe 方法订阅数据的变化（数据一旦变化，可以得到通知）
// 4. 使用 store 实例的 dispatch 方法提交 action 对象触发数据变化（告诉 reducer 你想怎么改数据）
// 5. 使用 store 实例的 getState 方法获取最新的状态数据更新到视图中
// ==========================================================

import React, { useState, useEffect } from 'react';
import { legacy_createStore as createStore } from 'redux';

// ==========================================================
// 1. 定义一个 reducer 函数 (根据当前想要做的修改返回一个新的状态)
// ==========================================================
function counterReducer(state = { count: 0 }, action) {
  // 根据 action.type 判断如何修改状态
  if (action.type === 'INCREMENT') {
    return { count: state.count + 1 };
  }
  if (action.type === 'DECREMENT') {
    return { count: state.count - 1 };
  }
  return state;
}

// ==========================================================
// 2. 使用 createStore 方法传入 reducer 函数 生成一个 store 实例对象
// ==========================================================
const store = createStore(counterReducer);

function PureReduxDemo() {
  // 5. 本地状态用于同步 store 中的最新值
  const [count, setCount] = useState(store.getState().count);

  // ==========================================================
  // 3. 使用 store 实例的 subscribe 方法 订阅数据的变化
  //    (数据一旦变化，可以得到通知)
  // ==========================================================
  useEffect(() => {
    // 订阅数据变化
    const unsubscribe = store.subscribe(() => {
      console.log('📢 store 数据发生变化:', store.getState());
      // 5. 使用 store 实例的 getState 方法 获取最新的状态数据更新到视图中
      setCount(store.getState().count);
    });

    // 组件卸载时取消订阅
    return () => {
      unsubscribe();
    };
  }, []);

  // ==========================================================
  // 4. 使用 store 实例的 dispatch 方法提交 action 对象 触发数据变化
  //    (告诉 reducer 你想怎么改数据)
  // ==========================================================
  const handleIncrement = () => {
    store.dispatch({ type: 'INCREMENT' });
  };

  const handleDecrement = () => {
    store.dispatch({ type: 'DECREMENT' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <h2 style={{ color: '#a8071a', margin: '0 0 8px 0' }}>Redux快速体验</h2>
      <p style={{ color: '#555', fontSize: '15px', margin: '0 0 24px 0' }}>
        不和任何框架绑定，不使用任何构建工具，使用纯 Redux 实现计数器
      </p>

      {/* 计数器界面 (完全还原截图样式) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '30px 0' }}>
        <button
          onClick={handleDecrement}
          style={{
            width: '56px',
            height: '56px',
            fontSize: '28px',
            fontWeight: 'bold',
            border: '2px solid #333',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          -
        </button>

        <span style={{ fontSize: '36px', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>
          {count}
        </span>

        <button
          onClick={handleIncrement}
          style={{
            width: '56px',
            height: '56px',
            fontSize: '28px',
            fontWeight: 'bold',
            border: '2px solid #333',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          +
        </button>
      </div>

      {/* 步骤解析说明卡片 */}
      <div style={{ backgroundColor: '#fafafa', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '18px 20px', fontSize: '14px', lineHeight: '1.9' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#222' }}>📖 使用步骤详解：</h4>
        <ol style={{ margin: 0, paddingLeft: '20px', color: '#333' }}>
          <li><strong>定义一个 reducer 函数</strong>（根据当前想要做的修改返回一个新的状态）</li>
          <li><strong>使用 createStore 方法传入 reducer 函数</strong> 生成一个 store 实例对象</li>
          <li><strong>使用 store 实例的 subscribe 方法</strong> 订阅数据的变化（数据一旦变化，可以得到通知）</li>
          <li><strong>使用 store 实例的 dispatch 方法提交 action 对象</strong> 触发数据变化（告诉 reducer 你想怎么改数据）</li>
          <li><strong>使用 store 实例的 getState 方法</strong> 获取最新的状态数据更新到视图中</li>
        </ol>
      </div>

      <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '6px', fontSize: '13px', color: '#0050b3' }}>
        💡 提示：纯原生 HTML 页面也已生成，可直接在浏览器打开：
        <a href="http://localhost:3000/redux-quick-start.html" target="_blank" rel="noreferrer" style={{ marginLeft: '8px', color: '#1890ff', fontWeight: 'bold' }}>
          打开纯原生 Redux 独立 HTML 网页 ↗
        </a>
      </div>
    </div>
  );
}

export default PureReduxDemo;
