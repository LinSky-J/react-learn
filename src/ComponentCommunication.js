// ==========================================================
// React 组件通信全集 (Component Communication in React)
// 包含 4 种核心通信模式：
// 1. 父传子 (Parent -> Child: Props)
// 2. 子传父 (Child -> Parent: Callback function)
// 3. 兄弟组件通信 (Sibling Communication: 状态提升)
// 4. 跨层级组件通信 (Cross-level: Context / useContext)
// ==========================================================

import React, { useState, createContext, useContext } from 'react';

// ==========================================================
// 1. 【父传子】Parent -> Child
// 原理：父组件在调用子组件时绑定属性，子组件通过 props 接收
// ==========================================================
function SonA({ name, age, isOnline, userList, children }) {
  return (
    <div style={{ border: '1px solid #1890ff', padding: '12px', borderRadius: '6px', margin: '10px 0', backgroundColor: '#e6f7ff' }}>
      <h4>子组件 SonA (接收父组件传递的各种数据类型)</h4>
      <p>姓名 (字符串): <strong>{name}</strong></p>
      <p>年龄 (数字): <strong>{age}</strong></p>
      <p>状态 (布尔值): <strong>{isOnline ? '🟢 在线' : '🔴 离线'}</strong></p>
      <p>列表 (数组): <strong>{userList.join(', ')}</strong></p>
      <div>插槽内容 (children): {children}</div>
    </div>
  );
}

function ParentToChildDemo() {
  const [name] = useState('Jack');
  const [age] = useState(20);
  const [userList] = useState(['Vue', 'React', 'Angular']);

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3>1. 父传子通信 (Props)</h3>
      <p style={{ color: '#666' }}>
        父组件通过属性给子组件传递数据（支持字符串、数字、布尔、数组、对象、JSX 等）：
      </p>
      <SonA
        name={name}
        age={age}
        isOnline={true}
        userList={userList}
      >
        <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>这是父组件作为 children 传入的 JSX 内容！</span>
      </SonA>
    </div>
  );
}


// ==========================================================
// 2. 【子传父】Child -> Parent
// 原理：父组件给子组件传递一个回调函数，子组件调用该函数并传入参数
// ==========================================================
function SonB({ onGetSonMsg }) {
  const sonMsg = '我是来自子组件 SonB 的问候！';

  return (
    <div style={{ border: '1px solid #52c41a', padding: '12px', borderRadius: '6px', margin: '10px 0', backgroundColor: '#f6ffed' }}>
      <h4>子组件 SonB</h4>
      <button
        onClick={() => onGetSonMsg(sonMsg)}
        style={{ padding: '6px 12px', backgroundColor: '#52c41a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        点击向父组件传递消息 (子传父)
      </button>
    </div>
  );
}

function ChildToParentDemo() {
  const [msgFromSon, setMsgFromSon] = useState('');

  // 1. 父组件定义回调函数
  const getSonMsg = (msg) => {
    console.log('父组件接收到了子组件的数据:', msg);
    setMsgFromSon(msg);
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3>2. 子传父通信 (Callback 回调函数机制)</h3>
      <p>父组件接收到的数据：<span style={{ color: '#52c41a', fontWeight: 'bold' }}>{msgFromSon || '暂无数据（请点击下方按钮）'}</span></p>
      {/* 2. 把回调函数以 prop 形式传递给子组件 */}
      <SonB onGetSonMsg={getSonMsg} />
    </div>
  );
}


// ==========================================================
// 3. 【兄弟组件通信】Sibling Communication (状态提升)
// 原理：将共享状态提升到共同的父组件中，A 组件通过“子传父”修改状态，父组件再通过“父传子”把状态传给 B 组件
// ==========================================================
function SiblingA({ onSendToSibling }) {
  return (
    <div style={{ border: '1px solid #fa8c16', padding: '12px', borderRadius: '6px', flex: 1, backgroundColor: '#fff7e6' }}>
      <h4>兄弟组件 A (发送方)</h4>
      <button
        onClick={() => onSendToSibling('来自组件 A 的苹果 🍎')}
        style={{ padding: '6px 12px', backgroundColor: '#fa8c16', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '6px' }}>
        发送 🍎
      </button>
      <button
        onClick={() => onSendToSibling('来自组件 A 的香蕉 🍌')}
        style={{ padding: '6px 12px', backgroundColor: '#fa8c16', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        发送 🍌
      </button>
    </div>
  );
}

function SiblingB({ sharedMsg }) {
  return (
    <div style={{ border: '1px solid #fa8c16', padding: '12px', borderRadius: '6px', flex: 1, backgroundColor: '#fff7e6' }}>
      <h4>兄弟组件 B (接收方)</h4>
      <p>接收到的共享数据：<strong style={{ color: '#d46b08' }}>{sharedMsg || '等待组件 A 发送...'}</strong></p>
    </div>
  );
}

function SiblingDemo() {
  // 状态提升：在共同的父组件中声明 sharedMsg 状态
  const [sharedMsg, setSharedMsg] = useState('');

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3>3. 兄弟组件通信 (状态提升 - Lifting State Up)</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* A 组件通过回调改变父组件状态 */}
        <SiblingA onSendToSibling={(msg) => setSharedMsg(msg)} />
        {/* B 组件接收父组件传递的新状态 */}
        <SiblingB sharedMsg={sharedMsg} />
      </div>
    </div>
  );
}


// ==========================================================
// 4. 【跨层级通信】Cross-level Communication (Context / useContext)
// 原理：使用 createContext 创建上下文，顶层使用 Provider 提供数据，底层使用 useContext 直接消费
// ==========================================================

// 1. 创建 Context 上下文对象
const ThemeContext = createContext();

// 底层孙子组件
function GrandChild() {
  // 3. 使用 useContext Hook 直接获取顶层 Provider 提供的数据
  const { color, themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ border: '2px dashed ' + color, padding: '12px', borderRadius: '6px', marginTop: '10px', backgroundColor: '#fafafa' }}>
      <h4>底层孙子组件 (GrandChild)</h4>
      <p>通过 <code>useContext</code> 跨级获取主题：<strong style={{ color: color }}>{themeName} ({color})</strong></p>
      <button
        onClick={toggleTheme}
        style={{ padding: '6px 12px', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        在孙子组件中一键切换全局主题
      </button>
    </div>
  );
}

// 中间子组件 (无需手动 props 透传)
function ChildMiddle() {
  return (
    <div style={{ border: '1px solid #722ed1', padding: '12px', borderRadius: '6px', margin: '10px 0', backgroundColor: '#f9f0ff' }}>
      <h4>中间子组件 (ChildMiddle - 无需任何 props 透传)</h4>
      <GrandChild />
    </div>
  );
}

function ContextDemo() {
  const [theme, setTheme] = useState({
    color: '#722ed1',
    themeName: '紫色梦想'
  });

  const toggleTheme = () => {
    setTheme(prev => ({
      color: prev.color === '#722ed1' ? '#13c2c2' : '#722ed1',
      themeName: prev.color === '#722ed1' ? '#13c2c2' : '紫色梦想'
    }));
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3>4. 跨层级组件通信 (createContext & useContext)</h3>
      <p style={{ color: '#666' }}>祖父组件通过 Context Provider 直接传递数据给任意深度的孙子组件，中间层无需层层传递 props：</p>
      {/* 2. 在顶层组件通过 Provider 包裹并提供 value */}
      <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
        <ChildMiddle />
      </ThemeContext.Provider>
    </div>
  );
}


// ==========================================================
// 汇总演示根组件：ComponentCommunication
// ==========================================================
function ComponentCommunication() {
  return (
    <div style={{ padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '850px', margin: '0 auto', color: '#222', lineHeight: '1.6' }}>
      <h2 style={{ color: '#1890ff', borderBottom: '2px solid #1890ff', paddingBottom: '8px' }}>
        React 组件通信 4 大核心模式全集
      </h2>

      {/* 1. 父传子 */}
      <ParentToChildDemo />
      <hr style={{ border: 'none', borderTop: '1px dashed #d9d9d9', margin: '20px 0' }} />

      {/* 2. 子传父 */}
      <ChildToParentDemo />
      <hr style={{ border: 'none', borderTop: '1px dashed #d9d9d9', margin: '20px 0' }} />

      {/* 3. 兄弟组件通信 */}
      <SiblingDemo />
      <hr style={{ border: 'none', borderTop: '1px dashed #d9d9d9', margin: '20px 0' }} />

      {/* 4. 跨层级通信 */}
      <ContextDemo />
    </div>
  );
}

export default ComponentCommunication;
