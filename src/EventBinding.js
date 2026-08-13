// ==========================================
// React 中的事件绑定语法示例 (Event Binding)
// ==========================================

import React from 'react';

function EventBinding() {

  // ------------------------------------------
  // 1. 基础事件处理函数（不带参数，不需要事件对象）
  // ------------------------------------------
  const handleClick1 = () => {
    console.log('【1. 基础点击】按钮被点击了！');
  };

  // ------------------------------------------
  // 2. 获取事件对象 e（SyntheticEvent 合成事件对象）
  // ------------------------------------------
  const handleClick2 = (e) => {
    console.log('【2. 事件对象】事件对象 e 为：', e);
    console.log('【2. 事件对象】触发事件的 DOM 元素：', e.target);
  };

  // 阻止默认行为的事件处理函数（如阻止超链接跳转、表单提交）
  const handleLinkClick = (e) => {
    e.preventDefault(); // 阻止 <a> 标签的默认跳转行为
    console.log('【2. 阻止默认行为】超链接被点击，但跳转已被阻止！');
  };

  // ------------------------------------------
  // 3. 传递自定义参数
  // 注意：需要使用箭头函数包裹，如：() => handleClick3('Jack')
  // 如果写成 onClick={handleClick3('Jack')}，则页面加载时就会立即执行函数！
  // ------------------------------------------
  const handleClick3 = (name) => {
    console.log(`【3. 传递自定义参数】你好，${name}！`);
  };

  // ------------------------------------------
  // 4. 同时传递自定义参数 和 事件对象 e
  // 语法：(e) => handleClick4('Tom', e)
  // ------------------------------------------
  const handleClick4 = (name, e) => {
    console.log(`【4. 传参 + 事件对象】姓名: ${name}`);
    console.log('【4. 传参 + 事件对象】事件对象 e:', e);
  };

  // ------------------------------------------
  // 5. 表单输入框事件 (onChange)
  // ------------------------------------------
  const handleInputChange = (e) => {
    console.log('【5. 表单输入】当前输入框的值为：', e.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.8' }}>
      <h2>React 事件绑定语法全集</h2>
      <hr />

      {/* 1. 基础事件绑定 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>1. 基础事件绑定</h3>
        {/* 注意：事件名采用驼峰命名法（onClick），传递函数名引用 handleClick1，不要加小括号 () */}
        <button onClick={handleClick1}>
          点击我 (基础绑定)
        </button>
      </section>

      {/* 2. 获取事件对象 e */}
      <section style={{ marginBottom: '20px' }}>
        <h3>2. 获取事件对象 e & 阻止默认行为</h3>
        <button onClick={handleClick2} style={{ marginRight: '10px' }}>
          点击获取事件对象 e
        </button>

        {/* 阻止超链接默认跳转 */}
        <a href="https://baidu.com" onClick={handleLinkClick}>
          百度 (点击阻止默认跳转)
        </a>
      </section>

      {/* 3. 传递自定义参数 */}
      <section style={{ marginBottom: '20px' }}>
        <h3>3. 传递自定义参数</h3>
        {/* 关键：使用箭头函数包裹事件处理函数，避免组件渲染时立即触发 */}
        <button onClick={() => handleClick3('Jack')} style={{ marginRight: '10px' }}>
          传递参数 "Jack"
        </button>
        <button onClick={() => handleClick3('Rose')}>
          传递参数 "Rose"
        </button>
      </section>

      {/* 4. 同时传递自定义参数和事件对象 e */}
      <section style={{ marginBottom: '20px' }}>
        <h3>4. 同时传递自定义参数和事件对象 e</h3>
        {/* 箭头函数形参传入 e，再传给处理函数 */}
        <button onClick={(e) => handleClick4('Tom', e)}>
          传递参数 "Tom" + 事件对象 e
        </button>
      </section>

      {/* 5. 常用表单输入事件 onChange */}
      <section style={{ marginBottom: '20px' }}>
        <h3>5. 输入框 onChange 事件</h3>
        <input
          type="text"
          placeholder="请输入内容，查看控制台输出..."
          onChange={handleInputChange}
          style={{ padding: '6px 12px', width: '250px' }}
        />
      </section>
    </div>
  );
}

export default EventBinding;
