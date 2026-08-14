// ==========================================================
// React useEffect Hook 核心用法全集 (UseEffect Demo)
// 作用：在函数组件中处理副作用操作（如：发送网络请求、修改DOM、定时器、事件监听等）
// 
// 核心掌握：4 种依赖项执行机制 + 清除副作用清理函数
// 1. 无依赖项：初始化 + 每次组件更新都执行
// 2. 空数组依赖 []：只在组件初次挂载（渲染）时执行 1 次 (常用于发请求获取初始数据)
// 3. 具体依赖项 [count]：初始化 + 依赖项发生变化时执行
// 4. 清理副作用 (return 清理函数)：组件卸载时或下次 effect 执行前触发 (用于清除定时器/解绑事件)
// ==========================================================

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ==========================================================
// 案例 1：依赖项参数的三种执行机制对比
// ==========================================================
function DependencyComparisonDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  // 1. 【没有依赖项】：组件初次挂载执行 + 每次组件重新渲染都执行
  useEffect(() => {
    console.log('1. [无依赖项] useEffect 执行了！(任意状态改变都会触发)');
  });

  // 2. 【空数组依赖 []】：只在组件初次挂载（首次渲染完毕）执行 1 次
  useEffect(() => {
    console.log('2. [空依赖项 []] useEffect 执行了！(只在组件出生挂载时执行 1 次)');
  }, []);

  // 3. 【特定依赖项 [count]】：初次挂载执行 + 只有 count 发生改变时才执行
  useEffect(() => {
    console.log(`3. [特定依赖项 [count]] useEffect 执行了！当前 count 是: ${count}`);
    // 例如：动态同步网页标题
    document.title = `点击了 ${count} 次`;
  }, [count]);

  return (
    <div style={{ border: '1px solid #91d5ff', padding: '16px', borderRadius: '8px', backgroundColor: '#e6f7ff', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#0050b3' }}>1. useEffect 依赖项执行时机对比</h3>
      <p>💡 打开浏览器 <strong>Console 控制台</strong> 观察不同按钮点击时的触发日志：</p>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          修改 count: {count} (触发 1 和 3)
        </button>

        <button
          onClick={() => setName(name === 'React' ? 'Vue' : 'React')}
          style={{ padding: '8px 16px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          修改 name: {name} (仅触发 1，不触发 3)
        </button>
      </div>
    </div>
  );
}


// ==========================================================
// 案例 2：在 useEffect 中使用 axios 发送异步网络请求
// 语法规则：useEffect 的回调函数不能直接声明为 async，需要在内部定义 async 函数并调用
// ==========================================================
function FetchDataDemo() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. 在 useEffect 内部定义 async 异步函数
    const getList = async () => {
      try {
        setLoading(true);
        // 2. 使用 axios 发送 GET 请求获取频道列表数据
        const res = await axios.get('http://geek.itheima.net/v1_0/channels');
        console.log('axios 请求成功，获取到的数据：', res.data);
        setList(res.data.data.channels);
      } catch (error) {
        console.warn('网络请求异常，加载备用数据:', error);
        setList([
          { id: 0, name: '推荐' },
          { id: 1, name: 'React 进阶' },
          { id: 2, name: 'Vue3 实战' },
          { id: 3, name: 'JavaScript 核心' },
          { id: 4, name: '前端工程化' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // 3. 调用异步函数
    getList();
  }, []); // 👈 传入空数组 []，确保只在组件初次渲染挂载时发送 1 次网络请求

  return (
    <div style={{ border: '1px solid #b7eb8f', padding: '16px', borderRadius: '8px', backgroundColor: '#f6ffed', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#237804' }}>2. 在 useEffect 中使用 axios 发送网络请求 (空依赖项 [])</h3>
      {loading ? (
        <p style={{ color: '#fa8c16' }}>⏳ 数据加载中 (axios.get 请求中)...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {list.map(item => (
            <span
              key={item.id}
              style={{ backgroundColor: '#fff', border: '1px solid #b7eb8f', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', color: '#237804', fontWeight: '500' }}>
              🏷️ {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}


// ==========================================================
// 案例 3：清除副作用（清理函数 Cleanup Function）
// 应用场景：定时器清理、解绑全局事件监听器、取消网络订阅等，防止内存泄漏
// ==========================================================
function TimerChild() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('⏰ 定时器开启 (组件挂载)');
    const timerId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 👈 核心：返回一个清理函数 (Cleanup Function)
    // 执行时机：组件卸载（销毁）时执行
    return () => {
      console.log('🛑 定时器已清除 (组件卸载)');
      clearInterval(timerId);
    };
  }, []);

  return (
    <div style={{ border: '1px dashed #faad14', padding: '10px 14px', borderRadius: '6px', backgroundColor: '#fffbe6', display: 'inline-block' }}>
      ⏱️ 子组件计时器正在运行：<strong>{seconds}</strong> 秒
    </div>
  );
}

function CleanupDemo() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div style={{ border: '1px solid #ffe58f', padding: '16px', borderRadius: '8px', backgroundColor: '#fffdf5', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#ad6800' }}>3. 清除副作用 (return 清理函数 - 定时器案例)</h3>
      <p style={{ color: '#666' }}>通过返回清理函数 <code>return () =&gt; clearInterval(timerId)</code> 在组件卸载时自动销毁定时器：</p>
      
      <div style={{ marginBottom: '12px' }}>
        <button
          onClick={() => setShowTimer(!showTimer)}
          style={{ padding: '6px 14px', backgroundColor: showTimer ? '#ff4d4f' : '#fa8c16', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {showTimer ? '卸载/隐藏计时器组件 (触发清理函数)' : '挂载/显示计时器组件'}
        </button>
      </div>

      {showTimer && <TimerChild />}
    </div>
  );
}


// ==========================================================
// 汇总展示根组件：UseEffectDemo
// ==========================================================
function UseEffectDemo() {
  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '850px', margin: '0 auto', color: '#222', lineHeight: '1.6' }}>
      <h2 style={{ color: '#00aeec', borderBottom: '2px solid #00aeec', paddingBottom: '8px' }}>
        React useEffect 核心使用指南
      </h2>

      {/* 1. 依赖项时机对比 */}
      <DependencyComparisonDemo />

      {/* 2. 异步请求获取数据 */}
      <FetchDataDemo />

      {/* 3. 清理副作用 */}
      <CleanupDemo />
    </div>
  );
}

export default UseEffectDemo;
