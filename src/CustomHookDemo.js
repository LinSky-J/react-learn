// ==========================================================
// React 自定义 Hook (Custom Hooks) 核心教程与实战全集
// 
// 1. 什么是自定义 Hook？
//    以 'use' 开头的函数，内部可以调用 useState、useEffect 等其他官方 Hook。
// 
// 2. 为什么需要自定义 Hook？
//    【核心目的】：实现【逻辑复用】！
//    将分散在不同组件中相同的状态逻辑和副作用逻辑抽取出来，提升代码复用性和可维护性。
// 
// 3. 编写规则：
//    - 函数名必须以 'use' 开头 (如 useToggle, useWindowSize)
//    - 只能在组件或其它自定义 Hook 的最顶层调用
//    - 可以返回状态值和修改状态的方法 (通过对象 {} 或数组 [] 返回)
// ==========================================================

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ==========================================================
// 自定义 Hook 1：useToggle (布尔开关/显隐切换 Hook)
// 功能：封装布尔值的切换与设置逻辑
// ==========================================================
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // 切换开关
  const toggle = () => setValue(prev => !prev);
  // 显式打开
  const setTrue = () => setValue(true);
  // 显式关闭
  const setFalse = () => setValue(false);

  // 返回状态和控制方法
  return { value, toggle, setTrue, setFalse };
}

// 演示组件 1：使用 useToggle
function ToggleExample() {
  const { value: isShow, toggle, setTrue, setFalse } = useToggle(true);
  const { value: isModalOpen, toggle: toggleModal } = useToggle(false);

  return (
    <div style={{ border: '1px solid #91d5ff', padding: '16px', borderRadius: '8px', backgroundColor: '#e6f7ff', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#0050b3' }}>1. 自定义 Hook：useToggle (显隐与开关复用)</h3>
      <p>状态值：<strong>{isShow ? '🟢 显示' : '🔴 隐藏'}</strong></p>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button onClick={toggle} style={{ padding: '6px 12px', backgroundColor: '#1890ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          切换显示/隐藏
        </button>
        <button onClick={setTrue} style={{ padding: '6px 12px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          强制显示
        </button>
        <button onClick={setFalse} style={{ padding: '6px 12px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          强制隐藏
        </button>
        <button onClick={toggleModal} style={{ padding: '6px 12px', backgroundColor: '#722ed1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isModalOpen ? '关闭弹窗' : '打开弹窗'}
        </button>
      </div>

      {isShow && (
        <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #91d5ff', borderRadius: '4px', marginBottom: '10px' }}>
          🎉 这是受 <code>useToggle</code> 控制的展开内容！
        </div>
      )}

      {isModalOpen && (
        <div style={{ padding: '10px', backgroundColor: '#f9f0ff', border: '1px dashed #722ed1', borderRadius: '4px' }}>
          🔔 这是另一个独立实例控制的弹窗组件！
        </div>
      )}
    </div>
  );
}


// ==========================================================
// 自定义 Hook 2：useWindowSize (监听浏览器窗口尺寸 Hook)
// 功能：监听 window resize 事件并在组件卸载时清除监听器
// ==========================================================
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // 1. 窗口改变处理函数
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 2. 绑定事件
    window.addEventListener('resize', handleResize);

    // 3. 清除副作用：解绑事件
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// 演示组件 2：使用 useWindowSize
function WindowSizeExample() {
  const { width, height } = useWindowSize();

  return (
    <div style={{ border: '1px solid #b7eb8f', padding: '16px', borderRadius: '8px', backgroundColor: '#f6ffed', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#237804' }}>2. 自定义 Hook：useWindowSize (监听视口尺寸)</h3>
      <p style={{ color: '#666' }}>💡 尝试拖动缩放浏览器窗口大小，数值将实时自动响应：</p>
      <div style={{ display: 'flex', gap: '24px', fontSize: '15px' }}>
        <span>📐 视口宽度 (width): <strong style={{ color: '#1890ff' }}>{width} px</strong></span>
        <span>📏 视口高度 (height): <strong style={{ color: '#52c41a' }}>{height} px</strong></span>
      </div>
    </div>
  );
}


// ==========================================================
// 自定义 Hook 3：useFetchChannels (封装异步数据请求 Hook)
// 功能：封装 axios 请求、loading 状态、错误处理与数据存储
// ==========================================================
function useFetchChannels() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://geek.itheima.net/v1_0/channels');
        setChannels(res.data.data.channels);
      } catch (err) {
        setError(err.message);
        // 异常时加载备用数据
        setChannels([
          { id: 0, name: '推荐' },
          { id: 1, name: 'React 进阶' },
          { id: 2, name: '前端工程化' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return { channels, loading, error };
}

// 演示组件 3：使用 useFetchChannels
function FetchChannelsExample() {
  // 一行代码直接获取数据、加载状态和错误信息
  const { channels, loading, error } = useFetchChannels();

  return (
    <div style={{ border: '1px solid #ffe58f', padding: '16px', borderRadius: '8px', backgroundColor: '#fffdf5', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#ad6800' }}>3. 自定义 Hook：useFetchChannels (封装数据请求逻辑)</h3>
      <p style={{ color: '#666' }}>组件无需写任何 useEffect 与请求细节，直接一行调用：</p>
      <code>{"const { channels, loading } = useFetchChannels();"}</code>

      <div style={{ marginTop: '12px' }}>
        {loading && <p style={{ color: '#fa8c16' }}>⏳ 正在通过自定义 Hook 加载频道数据...</p>}
        {error && <p style={{ color: '#ff4d4f' }}>⚠️ 请求提示: {error}</p>}
        {!loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {channels.map(item => (
              <span
                key={item.id}
                style={{ backgroundColor: '#fff', border: '1px solid #ffd591', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', color: '#ad6800', fontWeight: '500' }}>
                🏷️ {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// ==========================================================
// 汇总展示根组件：CustomHookDemo
// ==========================================================
function CustomHookDemo() {
  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '850px', margin: '0 auto', color: '#222', lineHeight: '1.6' }}>
      <h2 style={{ color: '#722ed1', borderBottom: '2px solid #722ed1', paddingBottom: '8px' }}>
        React 自定义 Hook (Custom Hooks) 核心教程
      </h2>

      {/* 1. useToggle */}
      <ToggleExample />

      {/* 2. useWindowSize */}
      <WindowSizeExample />

      {/* 3. useFetchChannels */}
      <FetchChannelsExample />
    </div>
  );
}

export default CustomHookDemo;
