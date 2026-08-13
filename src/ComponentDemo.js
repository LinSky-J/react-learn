// ==========================================
// React 组件基础：定义、调用与嵌套 (Component Basics)
// ==========================================

import React from 'react';

// ------------------------------------------
// 1. 定义子组件 A：普通函数组件
// 规范点：
// - 组件名称首字母必须【大写】（PascalCase，如 Button、Header）
// - 如果首字母小写（如 button），React 会将其识别为原生 HTML 标签
// - 组件必须返回 JSX 结构（或 null）
// ------------------------------------------
function Button() {
  return (
    <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
      这是一个自定义按钮组件
    </button>
  );
}

// ------------------------------------------
// 2. 定义子组件 B：箭头函数组件
// ------------------------------------------
const Header = () => {
  return (
    <header style={{ backgroundColor: '#4a90e2', color: '#fff', padding: '10px' }}>
      <h1>我是页头组件 (Header)</h1>
    </header>
  );
};

// ------------------------------------------
// 3. 定义子组件 C：接收 Props 的组件
// 父组件调用时传参：<UserCard name="张三" role="管理员" />
// 子组件形参可以直接解构接收：{ name, role }
// ------------------------------------------
function UserCard({ name, role }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', margin: '10px 0' }}>
      <p><strong>姓名：</strong>{name}</p>
      <p><strong>身份：</strong>{role}</p>
    </div>
  );
}

// ------------------------------------------
// 4. 父组件 / 主演示组件：嵌套并调用上述子组件
// ------------------------------------------
function ComponentDemo() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React 组件定义与调用基础</h2>
      <hr />

      {/* 方式一：调用页头组件 */}
      {/* 组件调用方式：自闭合标签 <Header /> 或 双标签 <Header></Header> */}
      <Header />

      {/* 方式二：组件的多次复用 */}
      <section style={{ marginTop: '20px' }}>
        <h3>1. 组件的多次复用</h3>
        <p>同一个组件可以被反复调用多次：</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button />
          <Button />
          <Button />
        </div>
      </section>

      {/* 方式三：传递 Props 给子组件 */}
      <section style={{ marginTop: '20px' }}>
        <h3>2. 带有 Props 的组件调用</h3>
        <UserCard name="Jack" role="前端工程师" />
        <UserCard name="Rose" role="UI 设计师" />
      </section>
    </div>
  );
}

export default ComponentDemo;
