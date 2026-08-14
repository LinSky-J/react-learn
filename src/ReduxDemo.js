// ==========================================================
// React Redux 核心教程与实战全集 (Redux Toolkit - RTK)
// 
// 1. 什么是 Redux？
//    Redux 是 React 最常用的【集中式全局状态管理库】。
//    当多个组件需要共享状态、或者深层组件之间需要通信时，使用 Redux 可以避免逐层传递 Props。
// 
// 2. 官方推荐现代开发方式：Redux Toolkit (RTK) + react-redux
//    - createSlice: 定义切片 (包含 name, initialState, reducers 同步/异步修改逻辑)
//    - configureStore: 组合所有子切片，创建全局唯一的 store
//    - Provider: 在顶层注入 store
//    - useSelector: 从 Redux store 中按需获取 state
//    - useDispatch: 获取 dispatch 函数，用于分发 (触发) action 修改状态
// ==========================================================

import React, { useEffect } from 'react';
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// ==========================================================
// 步骤 1：创建 Redux 切片 (counterSlice)
// ==========================================================

// 1.1 定义异步 thunk action：用于异步请求频道数据
export const fetchChannelList = createAsyncThunk(
  'channel/fetchChannelList',
  async () => {
    try {
      const res = await axios.get('http://geek.itheima.net/v1_0/channels');
      return res.data.data.channels;
    } catch {
      return [
        { id: 0, name: '推荐' },
        { id: 1, name: 'Redux 进阶' },
        { id: 2, name: 'React 全家桶' }
      ];
    }
  }
);

// 1.2 创建 counterSlice
const counterSlice = createSlice({
  name: 'counter', // 切片名称
  // 初始状态
  initialState: {
    count: 0,
    channelList: [],
    loading: false
  },
  // 同步修改状态的 reducers
  reducers: {
    increment(state) {
      // RTK 底层基于 Immer，支持直接修改 state（内部自动转为不可变更新）
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    addToNum(state, action) {
      // action.payload 为调用时传入的参数
      state.count += action.payload;
    },
    reset(state) {
      state.count = 0;
    }
  },
  // 异步 extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChannelList.fulfilled, (state, action) => {
        state.loading = false;
        state.channelList = action.payload;
      });
  }
});

// 导出生成的 action creators
export const { increment, decrement, addToNum, reset } = counterSlice.actions;

// ==========================================================
// 步骤 2：创建组合根 Store (configureStore)
// ==========================================================
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});


// ==========================================================
// 步骤 3：在组件中使用 useSelector 读取状态，useDispatch 派发 Action
// ==========================================================

// 示例子组件 A：负责修改状态
function CounterController() {
  // 1. 获取 dispatch 分发函数
  const dispatch = useDispatch();
  // 2. 从 store 获取当前 count
  const count = useSelector((state) => state.counter.count);

  return (
    <div style={{ border: '1px solid #91d5ff', padding: '16px', borderRadius: '8px', backgroundColor: '#e6f7ff', marginBottom: '20px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#0050b3' }}>组件 A (控制器)：读取并修改全局 count</h4>
      <p>当前全局状态 count：<strong style={{ fontSize: '20px', color: '#1890ff' }}>{count}</strong></p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{ padding: '6px 14px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ➕ 递增 (+1)
        </button>

        <button
          onClick={() => dispatch(decrement())}
          style={{ padding: '6px 14px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ➖ 递减 (-1)
        </button>

        <button
          onClick={() => dispatch(addToNum(10))}
          style={{ padding: '6px 14px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🚀 传参修改 (+10)
        </button>

        <button
          onClick={() => dispatch(addToNum(50))}
          style={{ padding: '6px 14px', backgroundColor: '#fa8c16', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🔥 传参修改 (+50)
        </button>

        <button
          onClick={() => dispatch(reset())}
          style={{ padding: '6px 14px', backgroundColor: '#8c8c8c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🔄 重置 (0)
        </button>
      </div>
    </div>
  );
}

// 示例子组件 B：只负责展示状态 (体验跨组件状态自动响应)
function CounterViewer() {
  // 无需从父组件传递 props，直接跨组件从 Redux store 获取
  const count = useSelector((state) => state.counter.count);

  return (
    <div style={{ border: '1px solid #d3adf7', padding: '16px', borderRadius: '8px', backgroundColor: '#f9f0ff', marginBottom: '20px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#722ed1' }}>组件 B (跨组件观察者)：无需 props，实时同步状态</h4>
      <p>组件 B 监听到来自 Redux 全局的 count 为：<span style={{ fontSize: '18px', fontWeight: 'bold', color: '#722ed1' }}>{count}</span></p>
      <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
        💡 无论组件 A 距离组件 B 有多远（甚至在完全不同的路由页面），只要组件 A <code>dispatch(action)</code>，组件 B 就会自动响应重新渲染！
      </p>
    </div>
  );
}

// 示例子组件 C：异步 Action 请求演示
function AsyncChannelList() {
  const dispatch = useDispatch();
  const { channelList, loading } = useSelector((state) => state.counter);

  // 组件挂载时分发异步 action 请求数据
  useEffect(() => {
    dispatch(fetchChannelList());
  }, [dispatch]);

  return (
    <div style={{ border: '1px solid #b7eb8f', padding: '16px', borderRadius: '8px', backgroundColor: '#f6ffed', marginBottom: '20px' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#237804' }}>组件 C：Redux 异步 Action (createAsyncThunk)</h4>
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => dispatch(fetchChannelList())}
          style={{ padding: '6px 14px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🔄 重新通过 Redux 异步 Action 获取频道数据
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#fa8c16' }}>⏳ Redux 正在异步请求数据中...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {channelList.map((item) => (
            <span
              key={item.id}
              style={{ backgroundColor: '#fff', border: '1px solid #b7eb8f', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', color: '#237804', fontWeight: '500' }}>
              📺 {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================================
// 汇总展示根组件：ReduxDemo
// 使用 <Provider store={store}> 包裹子组件
// ==========================================================
function ReduxDemo() {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '850px', margin: '0 auto', color: '#222', lineHeight: '1.6' }}>
        <h2 style={{ color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: '8px' }}>
          React Redux 核心使用指南 (Redux Toolkit 现代标准)
        </h2>

        {/* 核心概念速查表 */}
        <div style={{ backgroundColor: '#fafafa', border: '1px solid #e8e8e8', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>📋 Redux Toolkit 核心流程速记：</h4>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>createSlice</strong>：定义切片，包含 <code>initialState</code> 和 <code>reducers</code>（同步/异步修改状态）</li>
            <li><strong>configureStore</strong>：创建并导出唯一的全局根 <code>store</code></li>
            <li><strong>Provider</strong>：在顶层组件中注入 <code>&lt;Provider store=&#123;store&#125;&gt;</code></li>
            <li><strong>useSelector</strong>：从 store 中取出需要的数据 <code>const count = useSelector(state =&gt; state.counter.count)</code></li>
            <li><strong>useDispatch</strong>：分发 action 触发修改 <code>dispatch(increment())</code> 或 <code>dispatch(addToNum(10))</code></li>
          </ol>
        </div>

        {/* 1. 组件 A：控制器 */}
        <CounterController />

        {/* 2. 组件 B：跨组件展示 */}
        <CounterViewer />

        {/* 3. 组件 C：异步请求 */}
        <AsyncChannelList />
      </div>
    </Provider>
  );
}

export default ReduxDemo;
