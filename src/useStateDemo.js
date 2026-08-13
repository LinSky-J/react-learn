// ==========================================
// React 状态管理：useState Hook 基础示例
// ==========================================

import React, { useState } from 'react';

function UseStateDemo() {
  // ------------------------------------------
  // 1. 基础状态 (数字计数器)
  // useState(初始值) 返回一个数组：[当前状态值, 修改状态的方法]
  // ------------------------------------------
  const [count, setCount] = useState(0);

  // ------------------------------------------
  // 2. 对象状态 (修改对象属性时需遵循状态不可变原则，传递新对象)
  // ------------------------------------------
  const [user, setUser] = useState({ name: 'Jack', age: 18 });

  // 增加计数处理函数
  const handleAdd = () => {
    // 状态修改方法：setCount(新值)
    setCount(count + 1);
  };

  // 减少计数处理函数
  const handleSub = () => {
    setCount(count - 1);
  };

  // 修改对象状态（使用展开运算符 ... 保持其他字段不变化，传新对象）
  const handleChangeAge = () => {
    setUser({
      ...user,
      age: user.age + 1
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React useState 状态管理基础</h2>
      <hr />

      {/* 1. 数字状态计数器 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>1. 基础数字计数器：{count}</h3>
        <button onClick={handleAdd} style={{ marginRight: '10px' }}>
          加 1 (+1)
        </button>
        <button onClick={handleSub}>
          减 1 (-1)
        </button>
      </section>

      {/* 2. 修改对象状态 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>2. 对象状态管理</h3>
        <p>姓名：{user.name} | 年龄：{user.age}</p>
        <button onClick={handleChangeAge}>
          长一岁 (修改对象状态)
        </button>
      </section>
    </div>
  );
}

export default UseStateDemo;
