import React, { useState } from 'react';
import CustomHookDemo from './CustomHookDemo';
import UseEffectDemo from './UseEffectDemo';
import ComponentCommunication from './ComponentCommunication';
import CommentDemo from './CommentDemo';
import UseStateDemo from './useStateDemo';
import DomRefDemo from './DomRefDemo';
import ControlledInputDemo from './ControlledInputDemo';
import EventBinding from './EventBinding';
import ComponentDemo from './ComponentDemo';
import './index.css';

function App() {
  // 切换页面 Tab 状态 ('customHook' | 'effect' | 'communication' | 'dom' | 'input' | 'comment' | 'useState' | 'event' | 'component')
  const [activeTab, setActiveTab] = useState('customHook');

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* 顶部导航栏，允许在各个案例页面之间自由切换 */}
      <nav style={{ backgroundColor: '#fff', borderBottom: '1px solid #e3e5e7', padding: '12px 20px', display: 'flex', gap: '10px', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '16px', color: '#00aeec' }}>React 学习平台</span>

        <button
          onClick={() => setActiveTab('customHook')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'customHook' ? '#722ed1' : '#f1f2f3', color: activeTab === 'customHook' ? '#fff' : '#61666d' }}>
          🪝 自定义 Hook 实战
        </button>

        <button
          onClick={() => setActiveTab('effect')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'effect' ? '#00aeec' : '#f1f2f3', color: activeTab === 'effect' ? '#fff' : '#61666d' }}>
          ⚡ useEffect 副作用详解
        </button>

        <button
          onClick={() => setActiveTab('communication')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'communication' ? '#00aeec' : '#f1f2f3', color: activeTab === 'communication' ? '#fff' : '#61666d' }}>
          📡 组件通信 4 大模式
        </button>

        <button
          onClick={() => setActiveTab('dom')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'dom' ? '#00aeec' : '#f1f2f3', color: activeTab === 'dom' ? '#fff' : '#61666d' }}>
          🎯 useRef 获取 DOM 示例
        </button>

        <button
          onClick={() => setActiveTab('input')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'input' ? '#00aeec' : '#f1f2f3', color: activeTab === 'input' ? '#fff' : '#61666d' }}>
          📝 受控表单绑定
        </button>
        
        <button
          onClick={() => setActiveTab('comment')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'comment' ? '#00aeec' : '#f1f2f3', color: activeTab === 'comment' ? '#fff' : '#61666d' }}>
          💬 评论区案例页面
        </button>

        <button
          onClick={() => setActiveTab('useState')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'useState' ? '#00aeec' : '#f1f2f3', color: activeTab === 'useState' ? '#fff' : '#61666d' }}>
          📌 useState 核心规则
        </button>

        <button
          onClick={() => setActiveTab('event')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'event' ? '#00aeec' : '#f1f2f3', color: activeTab === 'event' ? '#fff' : '#61666d' }}>
          ⚡ 事件绑定示例
        </button>

        <button
          onClick={() => setActiveTab('component')}
          style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'component' ? '#00aeec' : '#f1f2f3', color: activeTab === 'component' ? '#fff' : '#61666d' }}>
          🧩 组件调用示例
        </button>
      </nav>

      {/* 页面内容区域 */}
      <main style={{ padding: '20px' }}>
        {activeTab === 'customHook' && <CustomHookDemo />}
        {activeTab === 'effect' && <UseEffectDemo />}
        {activeTab === 'communication' && <ComponentCommunication />}
        {activeTab === 'dom' && <DomRefDemo />}
        {activeTab === 'input' && <ControlledInputDemo />}
        {activeTab === 'comment' && <CommentDemo />}
        {activeTab === 'useState' && <UseStateDemo />}
        {activeTab === 'event' && <EventBinding />}
        {activeTab === 'component' && <ComponentDemo />}
      </main>
    </div>
  );
}

export default App;
