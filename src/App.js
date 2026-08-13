import React, { useState } from 'react';
import CommentDemo from './CommentDemo';
import UseStateDemo from './useStateDemo';
import EventBinding from './EventBinding';
import ComponentDemo from './ComponentDemo';
import './index.css';

function App() {
  // 切换页面 Tab 状态 ('comment' | 'useState' | 'event' | 'component')
  const [activeTab, setActiveTab] = useState('comment');

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 顶部导航栏，允许在各个案例页面之间自由切换 */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e3e5e7', padding: '12px 20px', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <span style={{ fontWeight: 'bold', marginRight: '16px', fontSize: '16px', color: '#00aeec' }}>React 学习平台</span>
        
        <button
          onClick={() => setActiveTab('comment')}
          style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'comment' ? '#00aeec' : '#f1f2f3', color: activeTab === 'comment' ? '#fff' : '#61666d' }}>
          💬 评论区案例页面 (Bilibili风格)
        </button>

        <button
          onClick={() => setActiveTab('useState')}
          style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'useState' ? '#00aeec' : '#f1f2f3', color: activeTab === 'useState' ? '#fff' : '#61666d' }}>
          📌 useState 核心规则
        </button>

        <button
          onClick={() => setActiveTab('event')}
          style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'event' ? '#00aeec' : '#f1f2f3', color: activeTab === 'event' ? '#fff' : '#61666d' }}>
          ⚡ 事件绑定示例
        </button>

        <button
          onClick={() => setActiveTab('component')}
          style={{ padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'component' ? '#00aeec' : '#f1f2f3', color: activeTab === 'component' ? '#fff' : '#61666d' }}>
          🧩 组件调用示例
        </button>
      </nav>

      {/* 页面内容区域 */}
      <main style={{ padding: '20px' }}>
        {activeTab === 'comment' && <CommentDemo />}
        {activeTab === 'useState' && <UseStateDemo />}
        {activeTab === 'event' && <EventBinding />}
        {activeTab === 'component' && <ComponentDemo />}
      </main>
    </div>
  );
}

export default App;
