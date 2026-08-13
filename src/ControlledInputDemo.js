// 受控表单绑定示例
import { useState } from "react";

// 1. 声明一个 react 状态 useState

// 2. 核心绑定流程：
// 2.1 通过 value 属性绑定 react 状态
// 2.2 绑定 onChange 事件，通过事件参数 e 拿到输入框最新的值，反向修改到 react 状态

function ControlledInputDemo() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>React 受控表单绑定示例</h2>
      <hr />
      <p>当前输入框绑定的 State 值为：<span style={{ color: '#00aeec', fontWeight: 'bold' }}>{value}</span></p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="请输入内容观察双向绑定..."
        style={{ padding: '6px 12px', width: '260px' }}
      />
    </div>
  );
}

export default ControlledInputDemo;
