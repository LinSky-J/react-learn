// ==========================================
// React 状态管理：useState Hook 核心规则与使用示例
// ==========================================

import React, { useState } from 'react';

function UseStateDemo() {
  // ------------------------------------------
  // 【Hook 规则 1】：只能在组件的最顶层（Top Level）调用 useState
  // 严禁在 if 条件句、for 循环或普通嵌套函数内部调用 useState！
  // ------------------------------------------
  
  // 1. 定义数字状态
  const [count, setCount] = useState(0);

  // 2. 定义对象状态
  const [user, setUser] = useState({ name: 'Jack', age: 18 });

  // 3. 定义数组状态
  const [list, setList] = useState(['Vue', 'React']);


  // ------------------------------------------
  // 【useState 核心规则 2】：状态不可变原则 (State Immutability)
  // 在 React 中，状态被视为只读（Read-Only）！
  // 
  // ❌ 错误示范（绝对禁止直接修改原状态）：
  // count = count + 1;        // 错！直接修改状态变量
  // user.age = 19;            // 错！直接修改对象的属性
  // list.push('Angular');     // 错！直接调用数组变异方法
  // 
  // 无法触发视图重新渲染的原因：直接修改原对象，引用没有改变，React 无法识别状态变更。
  // ------------------------------------------

  // ✅ 正确示范 1：修改数字（直接传入计算后的新值）
  const handleAdd = () => {
    setCount(count + 1);
  };

  // ✅ 正确示范 2：使用回调函数更新状态 (Updater Function)
  // 用于连续更新或依赖前一次最新状态的场景
  const handleAddThreeTimes = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  // ✅ 正确示范 3：修改对象（使用 ... 展开运算符生成全新的新对象）
  const handleChangeAge = () => {
    setUser({
      ...user,       // 展开旧对象的属性
      age: user.age + 1 // 覆盖更新需要改变的属性
    });
  };

  // ✅ 正确示范 4：修改数组（使用 ... 展开运算符或 concat/filter 生成新数组）
  const handleAddFramework = () => {
    setList([...list, 'Angular']); // 产生新数组传给 setList
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.8' }}>
      <h2>React useState 状态管理与修改规则</h2>
      <hr />

      {/* 规则总结看板 */}
      <div style={{ backgroundColor: '#f0f7ff', borderLeft: '5px solid #1890ff', padding: '12px 20px', marginBottom: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#1890ff' }}>📌 useState 修改状态的 4 大核心规则：</h4>
        <ol style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>状态不可变原则：</strong>禁止直接修改状态变量（如 <code>count++</code> 或 <code>user.age=19</code>）。必须通过 <code>setState</code> 传入新值或新对象。</li>
          <li><strong>使用新引用替换：</strong>修改对象/数组时，使用展开运算符 <code>...</code> 产生新对象/数组（如 <code>{"setUser({...user, age: 19})"}</code>）。</li>
          <li><strong>修改状态触发重渲染：</strong>调用 <code>setState</code> 会触发 React 重新执行组件函数并更新 DOM 视图。</li>
          <li><strong>只在顶层调用：</strong>Hook 只能在函数组件最顶层调用，严禁写在 <code>if</code>、循环或嵌套函数中。</li>
        </ol>
      </div>

      {/* 1. 数字状态计数器示例 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>1. 数字状态：当前 count = <span style={{ color: 'red' }}>{count}</span></h3>
        <button onClick={handleAdd} style={{ marginRight: '10px' }}>
          加 1 (+1)
        </button>
        <button onClick={handleAddThreeTimes}>
          连加 3 (回调函数更新 prevCount + 1)
        </button>
      </section>

      {/* 2. 对象状态修改示例 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>2. 对象状态：{user.name} ({user.age} 岁)</h3>
        <button onClick={handleChangeAge}>
          长一岁 (展开运算符生成新对象)
        </button>
      </section>

      {/* 3. 数组状态修改示例 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>3. 数组状态列表：</h3>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button onClick={handleAddFramework}>
          添加 Angular (展开运算符生成新数组)
        </button>
      </section>
    </div>
  );
}

export default UseStateDemo;
